const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
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
  let blog = new Blog(initialBlogs[0])
  await blog.save()
  blog = new Blog(initialBlogs[1])
  await blog.save()
})

describe('testing api', () => {
  test('returns all notes as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.ok(blog.id, 'Expected blog to have an id property')
      assert.strictEqual(typeof blog.id, 'string', 'Expected id to be a string')
      assert.strictEqual(blog._id, undefined, 'Expected _id to be undefined')
    })
  })

  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'Testing the api',
      author: 'me',
      url: 'www.something.com',
      likes: 5
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes('Testing the api'))
  })

  test('likes property defaults to 0 if missing', async () => {
    const newBlog = {
      title: 'Testing the api',
      author: 'me',
      url: 'www.something.com',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const likes = response.body.map(b => b.likes)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(likes.includes(0))
  })

  after(async () => {
    await mongoose.connection.close()
  })
})