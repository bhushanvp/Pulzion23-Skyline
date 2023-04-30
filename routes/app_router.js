const express = require("express")
const app_router = new express.Router()

app_router.get("/", (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect(`/${req.session.entity}/dashboard`)
    }
    else {
        res.render("index", {name: "World"})
    }
})

app_router.get("/register", (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect(`/${req.session.entity}/dashboard`)
    }
    else {
        res.render("register")
    }
})

app_router.get("/login", async (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect(`/${req.session.entity}/dashboard`)
    }
    else {
        res.render("login")
    }
})

app_router.get("/contact", (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect(`/${req.session.entity}/dashboard`)
    }
    else {
        res.render("contact")
    }
})

app_router.get("/about", (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect(`/${req.session.entity}/dashboard`)
    }
    else {
        res.render("about")
    }
})

module.exports = app_router