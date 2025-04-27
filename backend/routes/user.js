const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "accesstoken";
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, msg: "error", error: errors.array() });
      }
      const { name, email, password, location } = req.body;
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(password, salt);
      await User.create({
        name,
        location,
        email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, msg: "error", error: errors.array() });
      }
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res
          .status(401)
          .json({ success: false, msg: "Try loggin with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(password, userExist.password);
      if (!pwdCompare) {
        return res
          .status(401)
          .json({ success: false, msg: "Try loggin with correct credentials" });
      }
      // this should be object
      const data = { user: { id: userExist.id } };
      const authToken = jwt.sign(data, jwtSecret);
      return res.status(200).json({
        success: true,
        authToken: authToken,
        msg: "User Login Successfully !",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "error", error: error.message });
    }
  }
);

module.exports = router;
