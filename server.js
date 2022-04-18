const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const app = express();

//.env configuration
dotEnv.config({ path: "./config/.env" });

app.use(cors());
const PORT = process.env.PORT || 5000;
app.use("/github", require("./routers/usersRouter"));

app.use("/", (req, res) => {
  res.send(`<h2>GitHub Server</h2>`);
});

//starting server

app.listen(PORT, () => {
  console.log("Server Started");
});
