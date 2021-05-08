const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const mysql = require("../sql/mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SuccessResponse = require("../model/SuccessResponse");
function isValidEmail(email) {
  const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  return regex.test(email);
}

exports.register = asyncMiddleware(async (req, res, next) => {
  const { email, Password, idRole, flag } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(Password, salt);
  if (!isValidEmail(email)) {
    return next(new ErrorResponse(400, "Valid Email"));
  }
  mysql.query(
    `INSERT INTO account(email, Password, idRole, flag ) VALUES (?,?,'owner',true)`,
    [email, hashedPassword, idRole, flag],
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
    `SELECT * FROM account WHERE email = ?`,
    [email],
    async (err, result, fields) => {
      if (err) {
        console.log(err);
      }
      // console.log("result.email", result[0].email);
      // console.log("result.email", result[0].Password);
      // console.log("result.email", result.length);
      if (result.length > 0) {
        const checkPass = bcrypt.compare(Password, result[0].Password);
        // console.log("checkPass,", checkPass);
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
          const role = result[0].idRole;
          return res
            .status(200)
            .json(new SuccessResponse(200, { token, idRole: role }));
        } else {
          return next(new ErrorResponse(404, "Email is not found"));
        }
      }
    }
  );
});
