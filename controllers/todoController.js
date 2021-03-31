const Todo = require("../database/models/Todo");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");

exports.getAllTodos = asyncMiddleware(async (req, res, next) => {
  const todos = await Todo.find();
  return res.status(200).json(new SuccessResponse(200, todos));
});

exports.AddTodos = asyncMiddleware(async (req, res, next) => {
  const { content } = req.body;

  const newTodo = new Todo({ content });

  const todo = await newTodo.save();
  return res.status(200).json(new SuccessResponse(200, todo));
});
