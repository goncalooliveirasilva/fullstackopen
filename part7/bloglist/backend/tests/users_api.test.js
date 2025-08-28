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

  test('creating user with invalid username', async () => {
    const usersBefore = await helper.usersInDB()
    const newUser = {
      username: 'aa',
      name: 'name',
      password: 'secret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDB()
    assert.strictEqual(response.body.error, 'password and username must be at least 3 characters long.')
    assert.strictEqual(usersBefore.length, usersAfter.length)
  })

  test('creating user with invalid password', async () => {
    const usersBefore = await helper.usersInDB()
    const newUser = {
      username: 'username',
      name: 'name',
      password: 'aa'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDB()
    assert.strictEqual(response.body.error, 'password and username must be at least 3 characters long.')
    assert.strictEqual(usersBefore.length, usersAfter.length)
  })

  test('creating user with invalid username and password', async () => {
    const usersBefore = await helper.usersInDB()
    const newUser = {
      username: 'aa',
      name: 'name',
      password: 'aa'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDB()
    assert.strictEqual(response.body.error, 'password and username must be at least 3 characters long.')
    assert.strictEqual(usersBefore.length, usersAfter.length)
  })

  test('creating user with existing username', async () => {
    const usersBefore = await helper.usersInDB()
    const newUser = {
      username: 'root',
      name: 'name',
      password: 'secret'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfter = await helper.usersInDB()
    assert(response.body.error.includes('Expected `username` to be unique'))
    assert.strictEqual(usersBefore.length, usersAfter.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})