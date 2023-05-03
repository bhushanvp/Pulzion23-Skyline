const express = require("express")
const producer_router = new express.Router()
const {db} = require("../db/conn")
const middleware = require("../middlewares/producer_middleware")

producer_router.post("/producer/register", middleware.register, async (req, res) => {
    console.log(req.session.isAuth);
    if (req.session.isAuth) {
        res.redirect("/producer/dashboard")
    }
    else {
        res.render("register")
    }
})

producer_router.post("/producer/login", middleware.login, async (req, res) => {
    if (req.session.isAuth) {
        res.redirect("/producer/dashboard")
    }
    else {
        res.render("login")
    }
})

producer_router.get("/producer/dashboard", middleware.isAuth ,async (req, res) => {
    // res.set('Cache-Control', 'no-store');
    
    // Display Accepted Requests
    let accepted_requests;

    await db.promise().query(`select * from orders where producer_id = ${req.session.company_id} and order_status = -1;`).then((data) => {
        accepted_requests = data[0]
    }).catch((err) => {
        console.log(err.message);
    })
    
    // Display Pending Requests
    let pending_requests;
    await db.promise().query(`select * from orders where producer_id = ${req.session.company_id} and order_status > 0;`).then((data) => {
        pending_requests = data[0]
        // console.log(pending_requests);
    }).catch((err) => {
        console.log(err.message);
    })

    // Display pending_execution Requests
    let pending_verification_requests;
    await db.promise().query(`select * from orders where producer_id = ${req.session.company_id} and order_status = -2;`).then((data) => {
        pending_verification_requests = data[0]
    }).catch((err) => {
        console.log(err.message);
    })

    // Display Executed Requests
    let executed_requests;
    await db.promise().query(`select * from orders where producer_id = ${req.session.company_id} and order_status = -3;`).then((data) => {
        executed_requests = data[0]
    }).catch((err) => {
        console.log(err.message);
    })

    req.session.isAuth = true

    res.render("producer_dashboard", {
        name: req.session.username,
        accepted_requests: accepted_requests,
        pending_requests: pending_requests,
        pending_verification_requests: pending_verification_requests,
        executed_requests: executed_requests,
        order_status: req.session.order_status
    })
})

producer_router.post("/producer/create-order", middleware.isAuth, middleware.createOrder,  async (req, res) => {
    console.log(req.session.isAuth, "outside");
    res.redirect("/producer/dashboard")
})

producer_router.get("/producer/order/execute/:id", middleware.isAuth, middleware.executeOrder, async(req, res) => {
    console.log(req.session.isAuth, "outside");
    res.redirect("/producer/dashboard")
})

producer_router.get("/producer/logout", middleware.isAuth, (req, res) => {
    res.clearCookie("connect.sid")
    req.session.destroy()
    console.log("Logged out successfully");
    res.redirect("/login")
})

module.exports = producer_router