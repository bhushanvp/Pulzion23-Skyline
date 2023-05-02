const express = require("express")
const recycler_router = new express.Router()
const db = require("../db/conn")
const middleware = require("../middlewares/recycler_middleware")

recycler_router.post("/recycler/register", middleware.register, async (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect("/recycler/dashboard")
    }
    else {
        res.render("login")
    }
})

recycler_router.post("/recycler/login", middleware.login, async (req, res) => {
    if (req.session.isAuth) {
        req.session.isAuth = true
        res.redirect("/recycler/dashboard")
    }
    else {
        res.render("login")
    }
})

recycler_router.get("/recycler/dashboard", middleware.isAuth ,async (req, res) => {
    // Display Accepted Requests
    let accepted_requests;

    await db.promise().query(`select * from orders where recycler_id = ${req.session.company_id} and order_status = 111;`).then((data) => {
        accepted_requests = data[0]
        // console.log(accepted_requests);
    }).catch((err) => {
        console.log(err.message);
    })

    // make a list of locations from accepted requests and pass it into hbs;

    // Display available Requests
    let available_requests;
    await db.promise().query(`select * from orders where waste_type = ${req.session.waste_type} and order_status > 0 and order_status != 111;`).then((data) => {
        available_requests = data[0]
    }).catch((err) => {
        console.log(err.message);
    })

    req.session.isAuth = true

    res.render("recycler_dashboard", {name: req.session.username, accepted_requests: accepted_requests, available_requests: available_requests})
})

recycler_router.get("/recycler/order/accept/:id", middleware.acceptOrder, async (req, res) => {
    res.redirect("/recycler/dashboard")
})

recycler_router.post('/recycler/order/execute/:id', middleware.isAuth, middleware.executeOrder,async (req,res)=>{
    console.log(req.session.isAuth, "outside");
    res.redirect('/recycler/dashboard')
})

recycler_router.get("/recycler/logout", middleware.isAuth, (req, res) => {
    res.clearCookie("connect.sid")
    req.session.destroy()
    console.log("Logged out successfully");
    res.redirect("/login")
})

module.exports = recycler_router