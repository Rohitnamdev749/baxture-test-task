const router = require("express").Router();
const userController = require("../controllers/user.controller");
const UserController = require("../controllers/user.controller");

router.get("/", UserController.getUserList);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.create);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
