const { test, after, describe, beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper.test')

const api = supertest(app)

describe('Testing users api (already one user in db)', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ name: 'Someone', username: 'root', passwordHash })
    await user.save()
  })

  test('creating a new user with new username', async () => {
    const usersBefore = await helper.usersInDB()
    console.log(usersBefore)
    const newUser = {
      username: 'goncalo',
      name: 'Gonçalo',
      password: 'segredo'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDB()
    assert.strictEqual(usersAfter.length, usersBefore.length + 1)
    const usernames = usersAfter.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  after(async () => {
    await mongoose.connection.close()
  })
})