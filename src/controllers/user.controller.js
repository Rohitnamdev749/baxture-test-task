const CustomError = require("../Utils/CustomError");
const { use } = require("../routes/user.route");
const userService = require("../services/user.service");

class UserController {
  async create(req, res, next) {
    try {
      const { body } = req;
      console.log(body, "body");
      const user = await userService.create(body);
      res
        .json({
          success: true,
          data: user,
          message: "User created successfully",
        })
        .status(201);
    } catch (err) {
      const error = new CustomError(err.message, 500);
      return next(error);
    }
  }

  async getUserList(req, res) {
    try {
      const users = await userService.getUserList();
      if (users) {
        res
          .json({
            success: true,
            data: users,
            message: "get user list successfully",
          })
          .status(200);
      }
    } catch (err) {
      // res.json({ success: false, message: err.message }).status(500);
      // throw new Error(err);
      const error = new CustomError(err.message, 500);
      return next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const userById = await userService.getUserById(id);
      if (!userById) {
        const error = new CustomError("User not found", 404);
        return next(error);
      }
      res.status(200).json({ success: true, data: userById });
    } catch (err) {
      const error = new CustomError(err.message, 400);
      return next(error);
    }
  }

  async updateUser(req, res, next) {
    const {
      params: { id },
      body,
    } = req;

    try {
      const updateUser = await userService.updateUser(id, body);
      if (!updateUser) {
        const error = new CustomError("User not found", 404);
        return next(error);
      }
      res.status(200).json({ success: true, data: updateUser });
    } catch (err) {
      const error = new CustomError(err.message, 500);
      return next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (user) {
        await userService.deleteUser(id);
        res
          .status(200)
          .json({ success: true, message: "User deleted successfully" });
      }
      const error = new CustomError("User not found", 404);
      return next(error);
    } catch (err) {
      const error = new CustomError(err.message, 500);
      return next(error);
    }
  }
}

module.exports = new UserController();
