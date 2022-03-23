const express = require("express");
const router = express.Router(); // express 라우팅 기능을 사용하기 위해선 router 객체가 필요
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");

router.use("/users", userRoute); // '/users' 엔드포인트를 처리하기 위해 UserRouter를 붙여줌.
router.use("/products", productRoute);

module.exports = router; //이렇게 내보낸 router는 express app의 미들웨어로 사용됨.
