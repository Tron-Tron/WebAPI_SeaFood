const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");
exports.createNewOrder = asyncMiddleware(async (req, res, next) => {
  const {
    total,
    email,
    Payment,
    OrderDate,
    Status,
    Note,
    idPromotion,
  } = req.body;
  mysql.query(
    `INSERT INTO orders(total,email,Payment,OrderDate,Status,Note,idPromotion) VALUES (?,?,?,?,?,?,?)`,
    [total, email, Payment, OrderDate, Status, Note, idPromotion],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      res.status(201).json(new SuccessResponse(201, result));
    }
  );
});

exports.getAllOrders = asyncMiddleware(async (req, res, next) => {
  mysql.query(`SELECT * FROM orders`, async (err, result, fields) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      return res.status(200).json(new SuccessResponse(200, result));
    } else {
      return next(new ErrorResponse(404, "No Orders"));
    }
  });
});
exports.getOrderById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  if (!idOrder.trim()) {
    return next(new ErrorResponse(400, "idOrder is empty"));
  }
  mysql.query(
    `SELECT * FROM orders, detailorders WHERE orders.id = detailorders.idOrder and orders.id = ?`,
    [id],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.length > 0) {
        res.status(201).json(new SuccessResponse(201, result));
      } else {
        return next(new ErrorResponse(404, "No Orders"));
      }
    }
  );
});
exports.deleteOrderById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  if (!idOrder.trim()) {
    return next(new ErrorRespone(400, "idOrder is empty"));
  }
  mysql.query(
    `DELETE FROM orders where id = ? `,
    [id],
    async (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(new SuccessResponse(200, "Delete Successfully"));
      } else {
        return next(new ErrorResponse(404, "No Order"));
      }
    }
  );
});
exports.updateOrderById = asyncMiddleware(async (req, res, next) => {
  const { idOrder } = req.params;
  const { total, email, Payment, OrderDate, Status, Note } = req.body;
  if (!idOrder.trim()) {
    return next(new ErrorResponse(400, "idOrder is empty"));
  }
  mysql.query(
    `UPDATE orders SET total = ?,email=?, DeliveryDate=?, OrderDate=?, Status=?, Note=? WHERE idOrder = ?`,
    [total, email, DeliveryDate, OrderDate, Status, Note, idOrder],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(new SuccessResponse(200, "Update Successfully"));
      } else {
        return next(new ErrorResponse(404, "No Order"));
      }
    }
  );
});
