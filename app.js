const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
// ROUTE HANDLERS
const getAllBlogs = (req, res) => {};
const getBlog = (req, res) => {};
const createBlog = (req, res) => {};
const updateBlog = (req, res) => {};
const deleteBlog = (req, res) => {};
// ROUTES
app.route('/api/v1/blogs')
    .get(getAllBlogs)
    .post(createBlog);
app.route('/api/v1/blogs/:id')
    .get(getBlog)
    .patch(updateBlog)
    .delete(deleteBlog);
// LISTEN
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});
