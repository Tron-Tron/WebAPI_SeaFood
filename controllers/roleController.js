const { asyncMiddleware } = require("../middleware/asyncMiddleware");

const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");

exports.createNewRole = asyncMiddleware(async (req, res, next) => {
  const { role_name } = req.body;
  mysql.query(
    `INSERT INTO products(role_name) VALUES(?)`,
    [role_name],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      console.log(result);
    }
  );
});
exports.getAllRoles = asyncMiddleware(async (req, res, next) => {
  const roles = await Role.find();
  res.status(200).json(new SuccessResponse(200, roles));
});
