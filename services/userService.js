const userDao = require("../models/userDao");
const bc = require("bcrypt");

const signUp = async (email, password) => {
  try {
    if (password.length < 8) {
      const error = new Error("PASSWORD_TOO_SHORT");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await userDao.getUserIdByEmail(email);
    console.log("exist :", existingUser);

    if (existingUser.length !== 0) {
      const error = new Error("EXISTING_USER");
      error.statusCode = 400;
      throw error;
    }

    const salt = bc.genSaltSync();
    const hashedPw = bc.hashSync(password, salt);

    const createUser = await userDao.hashingPw(email, hashedPw);
    return createUser;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const logIn = async (email, password) => {
  try {
    console.log("로그인 서비스");
    const existingUser = await userDao.getUserPwByEmail(email);

    if (existingUser.length === 0) {
      const error = new Error("INVALID_USER");
      error.statusCode = 400;
      throw error;
    }

    if (!bc.compareSync(password, existingUser[0].password)) {
      const error = new Error("WRONG_PASSWORD");
      error.statusCode = 400;
      throw error;
    }

    return existingUser;
  } catch {
    console.log(err);
    return err;
  }
};

const allOfUsers = async () => {
  try {
    return await userDao.getAllOfUsers();
  } catch {
    console.log(err);
    return err;
  }
};

const changePw = async (email, password) => {
  try {
    const originalObject = await userDao.getUserPwByEmail(email);
    const originalPw = originalObject[0].password;
    // console.log(originalPw);

    if (bc.compareSync(password, originalPw)) {
      const error = new Error("EXISTING_PASSWORD");
      error.statusCode = 400;
      throw error;
    }

    const salt = bc.genSaltSync();
    const hashedPw = bc.hashSync(password, salt);
    return await userDao.changePwByEmail(email, hashedPw);
  } catch {
    console.log(err);
    return err;
  }
};

const deleteUser = async (email) => {
  try {
    return await userDao.deleteUserByEmail(email);
  } catch {
    console.log(err);
    return err;
  }
};

module.exports = { signUp, logIn, allOfUsers, changePw, deleteUser };
