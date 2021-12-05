const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hr7oi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const addproject = client.db("Myprotfilo").collection("addproject");

    app.get("/mycourse", async (req, res) => {
      res.send("sdd");
    });
    app.post("/addproject", async (req, res) => {
      const data = req.body;
      const result = await addproject.insertOne(data);
      res.json(result);
    });

    app.get("/project", async (req, res) => {
      const cursor = addproject.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch(() => console.log("error"));

app.listen(port, () => {
  console.log("server runing 4000");
});
