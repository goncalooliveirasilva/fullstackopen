const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const body = request.body;
    const user = request.user;
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    const blog = new Blog({
      ...body,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    // changed this because exercise 5.11
    await savedBlog.populate("user", { username: 1 });
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response
        .status(403)
        .json({ error: "You do not have permission to delete this blog" });
    }

    await blog.deleteOne();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", userExtractor, (request, response, next) => {
  const { likes } = request.body;
  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end();
      }
      blog.likes = likes;
      return blog.save().then((updatedBlog) => response.json(updatedBlog));
    })
    .catch((error) => next(error));
});

blogsRouter.post("/:id/comments", (request, response, next) => {
  const { comment } = request.body;
  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end();
      }
      blog.comments.push(comment);
      return blog.save().then((updatedBlog) => response.json(updatedBlog));
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
