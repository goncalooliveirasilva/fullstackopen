const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((fav, blog) => {
      return blog.likes > fav.likes ? blog : fav
    }, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const byAuthor = _.countBy(blogs, 'author')
  // console.log(byAuthor)
  const topAuthor = _.maxBy(Object.keys(byAuthor), author => byAuthor[author])
  return {
    author: topAuthor,
    blogs: byAuthor[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const groupedByAuthor = _.groupBy(blogs, 'author')
  // console.log(groupedByAuthor)
  const authorLikes = _.map(groupedByAuthor, (authorBlogs, author) => {
    return {
      author,
      likes: _.sumBy(authorBlogs, 'likes')
    }
  })
  // console.log(authorLikes)
  return _.maxBy(authorLikes, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }