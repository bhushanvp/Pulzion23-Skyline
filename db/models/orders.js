const mongoose = require("mongoose")

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

module.exports = orders;