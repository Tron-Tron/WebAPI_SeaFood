const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const mysql = require("../sql/mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SuccessResponse = require("../model/SuccessResponse");

exports.register = asyncMiddleware(async (req, res, next) => {
  const { email, UserName, Password, idRole, flat } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(Password, salt);
  mysql.query(
    `INSERT INTO user(email, UserName, Password, idRole, flag ) VALUES (?,?,?,'guest',true)`,
    [email, UserName, hashedPassword, idRole, flat],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      res.status(201).json(new SuccessResponse(201, result));
    }
  );
});

exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, Password } = req.body;
  mysql.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
    async (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      //     console.log("result.email", result[0].email);
      if (result.length > 0) {
        const checkPass = await bcrypt.compare(Password, result[0].Password);

        if (checkPass) {
          const token = jwt.sign(
            {
              //payload
              email: result[0].email,
              UserName: result[0].UserName,
              idRole: result[0].idRole,
            },
            process.env.JWT_KEY //secret key
          );
          console.log(token);
          return res.status(200).json(new SuccessResponse(200, token));
        } else {
          return next(new ErrorResponse(404, "Email is not found"));
        }
      }
    }
  );
});
