const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  const { title, content, author } = req.body
  const newBlog = new Blog({ title, content, author })

  try {
    await newBlog.save()
    res.redirect('/blogs')
  } catch (err) {
    res.status(500).send('Error saving blog.')
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.render('index', { blogs })
  } catch (err) {
    res.status(500).send('Error fetching blogs.')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.render('show', { blog })
  } catch (err) {
    res.status(500).send('Error fetching blog.')
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    res.render('edit', { blog })
  } catch (err) {
    res.status(500).send('Error fetching blog.')
  }
})

router.post('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.redirect(`/blogs/${updatedBlog._id}`)
  } catch (err) {
    res.status(500).send('Error updating blog.')
  }
})

router.get('/:id/delete', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/blogs')
  } catch (err) {
    res.status(500).send('Error deleting blog.')
  }
})

module.exports = router
