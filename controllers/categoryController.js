const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");
exports.createNewCategory = asyncMiddleware(async (req, res, next) => {
  const { CategoryName, parent_id } = req.body;
  if (CategoryName === "") {
    return next(new ErrorResponse(400, "CategoryName is empty"));
  }
  mysql.query(
    `INSERT INTO category(CategoryName) VALUES (?,?)`,
    [CategoryName, parent_id],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      res.status(201).json(new SuccessResponse(201, result));
    }
  );
});

exports.getAllCategory = asyncMiddleware(async (req, res, next) => {
  mysql.query(`SELECT * FROM category`, async (err, result, fields) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      return res.status(200).json(new SuccessResponse(200, result));
    } else {
      return next(new ErrorResponse(404, "No Category"));
    }
  });
});

exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  if (!id.trim()) {
    return next(new ErrorResponse(400, "idCategory is empty"));
  }
  mysql.query(
    `DELETE FROM category where id = ? `,
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
  const { id } = req.params;
  const { CategoryName } = req.body;
  if (!id.trim()) {
    return next(new ErrorResponse(400, "idCategory is empty"));
  }
  if (CategoryName.length === 0) {
    return next(new ErrorResponse(400, "CategoryName is empty"));
  }
  mysql.query(
    `UPDATE category SET CategoryName = ? WHERE id = ?`,
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
