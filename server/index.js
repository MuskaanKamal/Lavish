const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const Mongo = require("mongodb");
const url =
  "mongodb+srv://pooja:pooja@cluster0.auu8qto.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const database = client.db("lavish");
const ProductCollection = database.collection("products");
const UsersCollection = database.collection("users");
const LoginInfoCollection = database.collection("loginInfo");

app.get("/", (req, res) => {
  res.json("go to correct path");
});

app.get("/allproducts", async (req, res) => {
  const result = await ProductCollection.find({}).toArray();
  res.json(result);
});
app.get("/product/:id", async (req, res) => {
  let id = req.params.id;
  console.log("id :", id);
  let result = await ProductCollection.find({
    _id: Mongo.ObjectId(id),
  }).toArray();
  console.log("result :", result);
  res.json(result);
});
app.put("/updateProduct/:id", async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  let result = await ProductCollection.updateOne(
    { _id: Mongo.ObjectId(id) },
    {
      $set: {
        title: data.title,
        price: data.price,
        rating: data.rating,
        image: data.image,
      },
    }
  );
  console.log("result :", result);
  res.json(result.acknowledged);
});
app.post("/addProduct", async (req, res) => {
  let data = req.body;
  console.log("data :", data);
  let result = await ProductCollection.insertOne(data);
  if (result.acknowledged) res.json("Saved successfully");
  else res.json("Error!!!");
});
app.delete("/deleteProduct/:id", async (req, res) => {
  let id = req.params.id;
  let result = await ProductCollection.deleteOne({ _id: Mongo.ObjectId(id) });
  res.json(result.deletedCount);
});

app.post("/addUser", async (req, res) => {
  let data = req.body;
  console.log("data :", data);
  let result = await UsersCollection.insertOne(data);
  let sData = [result.acknowledged, data];
  res.json(sData);
});
app.post("/checkUser", async (req, res) => {
  let data = req.body;
  let email = data.email;
  let passwoord = data.passwoord;
  console.log("received :", data);
  let result = await UsersCollection.find(
    {
      email: email,
    },
    {
      password: passwoord,
    }
  ).toArray();
  let ack = true;
  if (result == null) ack = false;
  let sData = [ack, result];
  console.log("sending details :", sData);
  res.json(sData);
});

app.get("/loginInfo", async (req, res) => {
  let data = await LoginInfoCollection.find().toArray();
  console.log("data in loginInfo :", data);
  res.json(data);
});
app.delete("/removeLogin/:id", async (req, res) => {
  let id = req.params.id;
  let result = await LoginInfoCollection.deleteOne({ _id: Mongo.ObjectId(id) });
  res.json(result.deletedCount);
});
app.post("/addLoginInfo", async (req, res) => {
  let val = req.body;
  let data = {
    name: val[0].name,
    email: val[0].email,
    password: val[0].password,
    type: val[0].type,
  };
  console.log("received data in add log info :", val);
  console.log("now data :", data);
  let datainside = await LoginInfoCollection.find().toArray();
  let result;
  if (datainside.length == 0) {
    result = await LoginInfoCollection.insertOne(data);
  } else {
    result = await LoginInfoCollection.deleteMany();
    result = await LoginInfoCollection.insertOne(data);
  }
  res.json(result.acknowledged);
});

app.listen(5000, async () => {
  console.log("server running on port 5000");
  try {
    await client.connect();
    console.log("connected to mongodb");
  } catch (e) {
    console.error(e);
  }
});
