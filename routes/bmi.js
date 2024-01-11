// server.js

const express = require("express");
const bodyParser = require("body-parser");
const prisma = require("./prisma");
const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/calculate", async (req, res) => {
  const { age, gender, height, weight } = req.body;

  if (!age || !gender || !height || !weight) {
    return res.status(400).json({ message: "Please provide all the required input" });
  }

  const bmi = weight / ((height / 100) * (height / 100));

  const result = await prisma.bmi.create({
    data: {
      age,
      gender,
      height,
      weight,
      bmi,
    },
  });

  res.json(result);
});

app.get("/history", async (req, res) => {
  const history = await prisma.bmi.findMany();

  res.json(history);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
