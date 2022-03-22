const http = require("http");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { sendCategories } = require("./sendCategories");
const { sendList } = require("./sendList");
const { sendDetail } = require("./sendDetail");
const bc = require("bcrypt");
const jwt = require("jsonwebtoken");

// prismaClient의 자식 인스턴스를 사용
const prisma = new PrismaClient();

const app = express();
app.use(express.json()); // for parsing application/json

//회원가입 API
app.post("/users/signup", async (req, res) => {
  try {
    const { email, password } = req.body; //req 객체안에 넣음
    console.log("email: ", email, "password: ", password);

    if (!email || !password) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 8) {
      const error = new Error("PASSWORD_TOO_SHORT");
      error.statusCode = 400;
      throw error;
    }

    const existingUser =
      await prisma.$queryRaw`SELECT email FROM users WHERE email = ${email};`;

    if (existingUser[0].email === email) {
      // if (existingUser.length !== 0) {
      const error = new Error("EXISTING_USER");
      error.statusCode = 409;
      throw error;
    }

    const salt = bc.genSaltSync();
    const hashedPw = bc.hashSync(password, salt);

    //return 문이 바로 실행되는 것을 막기위해 await
    await prisma.$queryRaw`INSERT INTO users (email, password) VALUES (${email}, ${hashedPw});`;
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  } //try문 안에서 오류가 발생했을때 catch문으로 들어간다.
});

//로그인 API
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const existingUser =
      await prisma.$queryRaw`SELECT id, password FROM users WHERE email = ${email};`;

    console.log("existing : ", existingUser);

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

    const user = { userId: existingUser[0].id };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    console.log("token:", token);
    return res.status(200).json({ message: "LOGIN_SUCCESS", jwt: token });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
});

//가입된 유저를 모두 가져오는 API
app.get("/users", async (req, res) => {
  try {
    const allOfUsers = await prisma.$queryRaw`SELECT email FROM users`;
    console.log(allOfUsers);
    return res.status(201).json({
      message: "CREATED",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

//가입된 유저의 password를 수정하는 API
app.put("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email: ", email, "password: ", password);
    const changedPassword =
      await prisma.$queryRaw`UPDATE users SET password = ${password} where email = ${email}`;
    console.log(
      await prisma.$queryRaw`select password from users where email = ${email}`
    );
    return res.status(201).json({ message: "CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

//가입된 유저를 삭제하는 API
app.delete("/users", async (req, res) => {
  try {
    const { email } = req.body;
    await prisma.$queryRaw`DELETE FROM users WHERE email = ${email}`;
    return res.status(200).json({ message: "CREATED" });
  } catch {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

//카테고리 리스트 API
app.get("/products/categories", sendCategories);

//음료 리스트 API
app.get("/products", sendList);

//음료 상세정보 API
app.get("/products/2", sendDetail);

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`));
  } catch (err) {
    console.log(err);
    // await prisma.$disconnect(); //prisma도 통신이다.
  }
};

start();
