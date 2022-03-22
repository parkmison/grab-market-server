const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const product = require("./models/product");
const port = 8082;

app.use(express.json()); //json형식을 사용
app.use(cors());

app.get("/products", (req, res) => {
  //method가 get인 /products의 요청이 왔을때 아래쪽 코드가 실행됨 익명함수
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller"],
  })

    .then((result) => {
      console.log("PRODUCTS :" + result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("error 発生!！!");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller } = body;
  if (!name || !description || !price || !seller) {
    res.send("空になりなした。");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다");
    });
  res.send({
    body,
  });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id, eventId } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.log("error");
      res.send("에러 발생!!");
    });
});

app.listen(port, () => {
  console.log("쇼핑몰 서버 돌아가는중");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB연결 성공");
    })
    .catch((err) => {
      console.log(err);
      console.log("DB Connect Error");
      process.exit();
    });
});
