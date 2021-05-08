const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");

exports.getNotifi = asyncMiddleware(async (req, res, next) => {
  mysql.query(`call notifi ;`, async (err, result, field) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(500, err.sqlMessage));
    }
    return res.status(200).json(new SuccessResponse(200, result));
  });
});
exports.getReport = asyncMiddleware(async (req, res, next) => {
  mysql.query(`call statistical;`, async (err, result, field) => {
    if (err) {
      return next(new ErrorResponse(500, err.sqlMessage));
    }
    return res.status(200).json(new SuccessResponse(200, result));
  });
});
