const mysql = require("mysql2")
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/db1")
.then(() => {
    console.log("Orders DB Connected");
})
.catch((err) => {
    console.log(err.message);
})

const orders_schema = new mongoose.Schema({
    order_id: {
      type: Number,
      required: true,
    },
    rejected_by: {
      type: [Number]
    },
});
  
const orders = mongoose.model("orders", orders_schema);
const db = mysql.createConnection({
    host: '192.168.1.5',
    user: 'ronin2810',
    password: 'ronin2810',
    database: 'db1'
})
.on("connect", () => {
    console.log("DB connected");
})
.on("error", (err) => {
    console.log("DB not connected: ", err.message);
})

module.exports = { db, orders }