const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");
// exports.createNewOrder = asyncMiddleware(async (req, res, next) => {
//   const { total, email, DeliveryDate, OrderDate, Status, Note } = req.body;
//   mysql.query(
//     `INSERT INTO orders(total,email,DeliveryDate,OrderDate,Status,Note) VALUES (?,?,?,?,?,?)`,
//     [total, email, DeliveryDate, OrderDate, Status, Note],
//     (err, result, fields) => {
//       if (err) {
//         return next(new ErrorResponse(500, err.sqlMessage));
//       }
//       res.status(201).json(new SuccessResponse(201, result));
//     }
//   );
// });

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
  const { idOrder } = req.params;
  if (!idOrder.trim()) {
    return next(new ErrorResponse(400, "idOrder is empty"));
  }
  mysql.query(
    `SELECT * FROM orders, detailorders WHERE orders.idOrder = detailorders.idOrder and orders.idOrder = ?`,
    [idOrder],
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
exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { idCategory } = req.params;
  if (!idCategory.trim()) {
    return next(new ErrorRespone(400, "idCategory is empty"));
  }
  mysql.query(
    `DELETE FROM category where idCategory = ? `,
    [idCategory],
    async (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(new SuccessResponse(200, "Delete Successfully"));
      } else {
        return next(new ErrorResponse(404, "No Category"));
      }
    }
  );
});
exports.updateCategoryById = asyncMiddleware(async (req, res, next) => {
  const { idCategory } = req.params;
  const { CategoryName } = req.body;
  if (!idCategory.trim()) {
    return next(new ErrorResponse(400, "idCategory is empty"));
  }
  mysql.query(
    `UPDATE category SET CategoryName = ? WHERE idCategory = ?`,
    [CategoryName, idCategory],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(new SuccessResponse(200, "Update Successfully"));
      } else {
        return next(new ErrorResponse(404, "No Category"));
      }
    }
  );
});
