import { GraphQLError } from 'graphql'
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import { PubSub } from 'graphql-subscriptions'
const pubSub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      try {
        const books = await Book.find({}, 'genres')
        const genres = [...new Set(books.flatMap((book) => book.genres))]
        return genres
      } catch (error) {
        console.log(error)
        return []
      }
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id,
      })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        })
      }
      const result = book.populate('author')

      pubSub.publish('BOOK_ADDED', { bookAdded: result })

      return result
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'AUTHOR_NOT_FOUND',
          },
        })
      }
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'AUTHOR_NOT_FOUND',
            error,
          },
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch((error) => {
        throw new GraphQLError('Creating new user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      // hardcoded password
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong login credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }
      return {
        value: jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET,
        ),
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterableIterator(['BOOK_ADDED']),
    },
  },
}

export default resolvers
