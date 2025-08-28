const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body
    if (!username || !password) {
      return response.status(400).json({ error: 'username and/or password missing' })
    }
    if (password.length < 3 || username.length < 3) {
      return response.status(400).json({ error: 'password and username must be at least 3 characters long.' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1
      })
    response.json(users)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter