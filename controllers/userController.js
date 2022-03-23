const userService = require("../services/userService");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body; //req 객체안에 넣음
    console.log("email: ", email, "password: ", password);

    if (!email || !password) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const createdUser = await userService.signUp(email, password);

    res.status(201).json({
      message: "SIGNUP SUCCESS",
    });
  } catch (err) {
    next();
    // return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const logIn = async (req, res, next) => {
  try {
    console.log("로그인 컨트롤러");
    const { email, password } = req.body; //req 객체안에 넣음
    console.log("email: ", email, "password: ", password);

    if (!email || !password) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const logedUser = await userService.logIn(email, password);

    const user = { userId: logedUser[0].id };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    console.log("token:", token);
    return res.status(200).json({ message: "LOGIN_SUCCESS", jwt: token });
  } catch (err) {
    next();
    // return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const allOfUsers = async (req, res, next) => {
  try {
    const users = await userService.allOfUsers();
    return res.status(201).json({
      message: "CREATED",
      users: users,
    });
  } catch {
    next();
  }
};

const changePw = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await userService.changePw(email, password);
    return res.status(201).json({
      message: "CREATED",
    });
  } catch {
    next();
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const users = await userService.deleteUser(email);
    return res.status(201).json({
      message: "CREATED",
    });
  } catch {
    next();
  }
};

module.exports = { signUp, logIn, allOfUsers, changePw, deleteUser };
