const express = require("express");
const { asyncMiddleware } = require("../../middleware/asyncMiddleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("../../sql/mysql");
const SuccessResponse = require("../../model/SuccessResponse");
const ErrorResponse = require("../../model/SuccessResponse");
const authController = require("../../controllers/authController");
const router = express.Router();

//authentication va authorization

//authentication: noi ve thong tin cua user dang hoat dong
//authorization: xac dinh  quyen cua user de su dung

// route.get(
//   "/test",
//   jwtAuth,
//   authorize("admin"),
//   asyncMiddleware(async (req, res, next) => {
//     res.status(200).json({ success: true });
//   })
// );
router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
