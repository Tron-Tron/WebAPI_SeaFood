const { isValidObjectId } = require("mongoose");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const ErrorRespone = require("../model/ErrorResponse");
const SuccessResponse = require("../model/SuccessResponse");

exports.getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find()
    .populate({
      path: "role_detail",
      select: { role_name: 1, role_desc: 1 },
      //      select: "role_name role_desc",
    })
    .select("-password ");
  if (!users.length) {
    //mang rong trong javascript la true
    return next(new ErrorRespone(404, "No users"));
  }
  res.status(200).json(new SuccessResponse(200, users));
});
exports.getUserById = asyncMiddleware(async (req, res, next) => {
  console.log(req.params.userId);
  const { userId } = req.params;
  if (!userId.trim()) {
    return next(new ErrorRespone(400, "userId is empty"));
  }
  const user = await User.findById(userId)
    //   .select("name email")
    .select("-password")
    .catch((err) => {
      return next(new ErrorRespone(404, "User is not found"));
    });
  if (user) {
    res.status(200).json(new SuccessResponse(200, user));
  }
});
exports.deleteUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId.trim()) {
    return next(new ErrorRespone(400, "userId is empty"));
  }

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return next(new ErrorRespone(400, "Can not delete"));
  }
  res.status(200).json(new SuccessResponse(200));
});

exports.updateUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  const { name, password } = req.body;
  if (!userId.trim()) {
    return next(new ErrorRespone(400, "userId is empty"));
  }

  // const updatedUser = await User.findOneAndUpdate(
  //   { _id: userId },
  //   req.body,
  //   { new: true } //tra ve data sau khi update, khong co thi tra ve data truoc khi update
  // );

  //validate ObjetcId
  if (!isValidObjectId(userId)) {
    return next(new ErrorRespone(400, "Id is invalid"));
  }
  const doc = await User.findById(userId);
  //neu khong tim thay user tren database
  if (!doc) {
    //update user
    return next(new ErrorRespone(404, "User is not found"));
  }
  doc.name = name;
  doc.password = password;
  const updatedUser = await doc.save();
  if (!updatedUser) {
    return next(new ErrorRespone(400, "Can not update"));
  }
  res.status(200).json(new SuccessResponse(200, updatedUser));
});
