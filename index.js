const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5nrgbhc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menuCollection = client.db("epicureanDB").collection("menu");

    // get all from menu
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    //-------------------------------------
    const reviewsCollection = client.db("epicureanDB").collection("reviews");

    // get all from reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged! Successfully connected to MongoDB!");
  } catch {
    console.log("An error occurred");
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("epicurean-server is douring");
});

app.listen(port, () => {
  console.log(`epicurean-haven-server is running on port ${port}`);
});
