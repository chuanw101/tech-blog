const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

router.get("/", (req, res) => {
    Blog.findAll().then(blogs => {
        console.log(blogs)
        const hbsBlogs = blogs.map(blog => blog.get({ plain: true }))
        console.log("==========")
        console.log(hbsBlogs)
        const loggedIn = req.session.user ? true : false
        res.render("home", { blogs: hbsBlogs, loggedIn, username: req.session.user?.username })
    })
})

router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id, {
        include: [Blog]
    }).then(userData => {
        console.log(userData);
        const hbsData = userData.get({ plain: true })
        console.log("=======")
        console.log(hbsData);
        hbsData.loggedIn = req.session.user ? true : false
        res.render("profile", hbsData)
    })
})

router.get("/blogpost/:id", (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [{
            model: Comment,
            include: [User]
        }, User],
        nest: true,
    }).then(blogData => {
        const data = blogData.get({ plain: true })
        console.log(blogData)
        res.render("blogpost", data)
    })
})

module.exports = router;