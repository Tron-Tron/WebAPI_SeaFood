const { asyncMiddleware } = require("../middleware/asyncMiddleware");

const ErrorResponse = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");
const fs = require("fs");

exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
  mysql.query(`SELECT * FROM products`, (err, result, fields) => {
    if (err) {
      return next(new ErrorResponse(500, err.sqlMessage));
    }
    if (result.length > 0) {
      res.status(201).json(new SuccessResponse(201, result));
    } else {
      return next(new ErrorResponse(404, "No Products"));
    }
  });
});
exports.createNewProduct = asyncMiddleware(async (req, res, next) => {
  const {
    ProductName,
    Price,
    Date,
    Amount,
    Description,
    Distributor,
    idCategory,
    idPromotion,
    idComment,
    idRating,
  } = req.body;

  const Remark = Boolean(req.body.Remark);
  const mime = req.file.mimetype;
  const dataImage = fs.readFileSync(`uploads/${req.file.filename}`);

  mysql.query(
    `INSERT INTO products(ProductName,
      Price,
      Date,
      Amount,
      Description,
      Remark,
      Image,
      Distributor,
      idCategory,
      idPromotion,
      idComment,
      mime,
      idRating) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      ProductName,
      Price,
      Date,
      Amount,
      Description,
      Remark,
      dataImage,
      Distributor,
      idCategory,
      idPromotion,
      idComment,
      mime,
      idRating,
    ],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      res.status(201).json(new SuccessResponse(201, result));
    }
  );
});
exports.deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.params;
  if (!idProduct.trim()) {
    return next(new ErrorResponse(400, "idProduct is empty"));
  }
  mysql.query(
    `DELETE FROM products WHERE idProduct= ?`,
    [idProduct],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(
            new SuccessResponse(200, `Delete Successfully Product ${idProduct}`)
          );
      } else {
        return next(new ErrorResponse(404, `No Product has ${idProduct}`));
      }
    }
  );
});
exports.getProductById = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.params;
  if (!idProduct.trim()) {
    return next(new ErrorResponse(400, "idProduct is empty"));
  }
  mysql.query(
    `SELECT * FROM products WHERE idProduct= ?`,
    [idProduct],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.length > 0) {
        res.status(201).json(new SuccessResponse(201, result));
      } else {
        return next(new ErrorResponse(404, "No Products"));
      }
    }
  );
});
exports.updateProductById = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.params;
  const {
    ProductName,
    Price,
    Date,
    Amount,
    Description,
    Remark,
    Image,
    Distributor,
    idCategory,
    idPromotion,
    idComment,
    idRating,
  } = req.body;
  if (!idProduct.trim()) {
    return next(new ErrorResponse(400, "idProduct is empty"));
  }
  mysql.query(
    `UPDATE products SET ProductName = ?,Price=?,
  Date=?,
  Amount=?,
  Description=?,
  Remark=?,
  Image=?,
  Distributor=?,
  idCategory=?,
  idPromotion=?,
  idComment=?,
  idRating=? WHERE idProduct = ?`,
    [
      ProductName,
      Price,
      Date,
      Amount,
      Description,
      Remark,
      Image,
      Distributor,
      idCategory,
      idPromotion,
      idComment,
      idRating,
      idProduct,
    ],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(
            new SuccessResponse(
              200,
              `Update product has ${idProduct} Successfully`
            )
          );
      } else {
        return next(new ErrorResponse(404, "No product"));
      }
    }
  );
});
