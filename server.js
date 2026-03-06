require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { handler } = require("./netlify-functions/chat.js");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

  const result = await handler({
    body: JSON.stringify(req.body)
  });

  res.send(JSON.parse(result.body));

});

app.get("/", (req, res) => {
  res.send("AI Portfolio Server Running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});