const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorResponse = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");
const mysql = require("../sql/mysql");
const bcrypt = require("bcryptjs");
function isValidEmail(email) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function validatePhoneNumber(phone) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(phone);
}
exports.createNewStaff = asyncMiddleware(async (req, res, next) => {
  const { p_email, p_password, p_name, p_address, p_phone } = req.body;
  const p_image = req.file.filename;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(p_password, salt);
  if (!isValidEmail(p_email)) {
    return next(new ErrorResponse(400, "Valid Email"));
  }
  if (!validatePhoneNumber(p_phone)) {
    return next(new ErrorResponse(400, "Valid Phone"));
  }
  mysql.query(
    `CALL creat_account_employee(?,?,?,?,?,?)`,
    [p_email, hashedPassword, p_name, p_address, p_phone, p_image],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      res.status(201).json(new SuccessResponse(201, result));
    }
  );
});

exports.getAllStaffs = asyncMiddleware(async (req, res, next) => {
  mysql.query(`SELECT * FROM employees`, async (err, result, fields) => {
    if (err) {
      return next(new ErrorResponse(500, err.sqlMessage));
    }
    if (result.length > 0) {
      return res.status(200).json(new SuccessResponse(200, result));
    } else {
      return next(new ErrorResponse(404, "No employees"));
    }
  });
});

exports.deleteStaffById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  if (!id.trim()) {
    return next(new ErrorResponse(400, "idEmployees is empty"));
  }
  mysql.query(
    `DELETE FROM employees where id = ? `,
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
        return next(new ErrorResponse(404, "No Employees"));
      }
    }
  );
});
exports.updateEmployeeById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const { email, Address, Phone, EmployeeName } = req.body;
  const image = req.file.filename;
  if (!id.trim()) {
    return next(new ErrorResponse(400, "email is empty"));
  }
  if (!email.trim()) {
    return next(new ErrorResponse(400, "email is empty"));
  }
  if (!isValidEmail(email)) {
    return next(new ErrorResponse(400, "Valid Email"));
  }
  if (!validatePhoneNumber(Phone)) {
    return next(new ErrorResponse(400, "Valid Phone"));
  }
  mysql.query(
    `UPDATE employees SET Address=?, Phone=?, EmployeeName=?,image=? WHERE email = ?`,
    [Address, Phone, EmployeeName, image, email],
    (err, result, fields) => {
      if (err) {
        return next(new ErrorResponse(500, err.sqlMessage));
      }
      if (result.affectedRows > 0) {
        return res
          .status(200)
          .json(new SuccessResponse(200, "Update Successfully"));
      } else {
        return next(new ErrorResponse(404, "No Employee"));
      }
    }
  );
});
