const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/',  async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {
        username: 1,
        name: 1,
        id: 1
      })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    const blog = new Blog({
      ...body,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
  const { likes } = request.body
  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end()
      }
      blog.likes = likes
      return blog.save().then((updatedBlog) => response.json(updatedBlog))
    })
    .catch(error => next(error))
})

module.exports = blogsRouter