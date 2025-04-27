const express = require("express");
const router = express.Router();

router.get("/foodData", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      foodArr: global.foodItems,
      foodCatArr: foodCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "error", error: error.message });
  }
});

module.exports = router;
