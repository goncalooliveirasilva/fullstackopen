const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body
    const user = await User.findOne({ username })
    const passWordCorrect = (user === null)
      ? false
      : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passWordCorrect)) {
      return response.status(401).json({ error: 'Invalid username and/or passord' })
    }
    const token = jwt.sign({
      username: user.username,
      id: user._id
    }, process.env.SECRET)
    response
      .status(200)
      .send({
        token,
        username: user.username,
        name: user.name
      })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter