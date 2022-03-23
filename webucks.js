const http = require("http");
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(routes);

//회원가입 API
//로그인 API
//가입된 유저를 모두 가져오는 API
//가입된 유저의 password를 수정하는 API
//가입된 유저를 삭제하는 API
//카테고리 리스트 API
//음료 리스트 API
//음료 상세정보 API

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
