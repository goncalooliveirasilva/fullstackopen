const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleMany({})
  await User.deleMany({})

  response.status(204).end()
})

module.exports = router