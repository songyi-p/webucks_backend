const express = require("express");
const router = express.Router();
//route는 오직 controller에만 의존함.
const userController = require("../controllers/userController");

router.post("/signup", userController.signUp); //내보내면 부모 router에 자동으로 연결됨
router.post("/login", userController.logIn);
router.get("", userController.allOfUsers);
router.put("", userController.changePw);
router.delete("", userController.deleteUser);

module.exports = router;
