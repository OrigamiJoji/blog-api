const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
// TOP LEVEL
const blogs = JSON.parse(
    fs.readFileSync(`${__dirname}/data/blogs.json`)
);
// ROUTE HANDLERS
const getAllBlogs = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: {
            blogs,
        },
    });
};
const getBlog = (req, res) => {
    const id = req.params.id * 1;
    if (id > blogs.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'out of range',
        });
    }

    const blog = blogs.find((e) => e.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            blog: blog,
        },
    });
};
const createBlog = (req, res) => {
    const newBlogId = blogs[blogs.length - 1].id + 1;
    const date = new Date().toDateString();
    const newBlogPost = Object.assign(
        { id: newBlogId, date },
        req.body
    );
    blogs.push(newBlogPost);
    fs.writeFile(
        `${__dirname}/data/blogs.json`,
        JSON.stringify(blogs),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    blog: newBlogPost,
                },
            });
        }
    );
};
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
