const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/createOrder", async (req, res) => {
  try {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    const userExist = await Order.findOne({ email: req.body.email });
    if (!userExist) {
      await Order.create({ email: req.body.email, order_data: [data] });
      return res.status(200).json({ success: true });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "error", error: error.message });
  }
});

router.post("/getOrder", async (req, res) => {
  try {
    const { email } = req.body;
    const orderData = await Order.findOne({ email });
    res.status(200).json({ orderData: orderData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "error", error: error.message });
  }
});

module.exports = router;
