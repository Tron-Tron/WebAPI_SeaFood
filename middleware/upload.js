const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg||JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    //cl trong fileFilter nhan 2 tham so
    //1-error
    //2-true||false -> xac dinh co luu hay khong
    return cb(
      new Error(`Do not support ${path.extname(file.originalname)}`),
      false
    );
  }
  cb(null, true);
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //   cb(null, __dirname + "/uploads");
    cb(null, path.join(`${__dirname}/../uploads`));
    //dir=directory(duong dan)
    //_dirname: lay duong dan hien tai cua file dang su dung no
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage, fileFilter });
module.exports = upload;
