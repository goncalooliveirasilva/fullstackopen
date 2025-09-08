import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'
import Book from './models/book.js'
import Author from './models/author.js'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoBD')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = `#graphql
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

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
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Savingn author failed', {
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
      return book.populate('author')
    },
    editAuthor: async (root, args) => {
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
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
