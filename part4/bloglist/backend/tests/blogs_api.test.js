const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blog = new Blog(blogs[0])
  await blog.save()
  blog = new Blog(blogs[1])
  await blog.save()
})


describe('testing api', () => {
  test('returns all notes as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, blogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.ok(blog.id, 'Expected blog to have an id property')
      assert.strictEqual(typeof blog.id, 'string', 'Expected id to be a string')
      assert.strictEqual(blog._id, undefined, 'Expected _id to be undefined')
    })
  })




  after(async () => {
    await mongoose.connection.close()
  })
})