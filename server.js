const express = require("express");
const cors = require("cors");
const app = express();
const port = 8089;

app.use(express.json()); //json형식을 사용
app.use(cors());

app.get("/products", (req, res) => {
  //method가 get인 /products의 요청이 왔을때 아래쪽 코드가 실행됨 익명함수
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.post("/products", (req, res) => {
  res.send("상품이 등록되었습니다.");
});

app.listen(port, () => {
  console.log("쇼핑몰 서버 돌아가는중");
});
