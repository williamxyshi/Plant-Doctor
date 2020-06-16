// step 8 on https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i

const express = require("express");
const bodyParser = require("body-parser");

const user = require("./routes/user");
const plant = require("./routes/plant");

var fs = require('fs')
var https = require('https')

const app = express();

var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const db = require("./models");


db.mongoose
  .connect(`mongodb://localhost:27017/plantdoctordb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// PORT
const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "base route response" });
});

app.use("/user", user);
app.use("/plant", plant);

https.createServer(
 credentials, app).listen(PORT, (req, res) => {
  console.log(`Server Started at https://localhost:${PORT}`);
});

app.listen(4000, (req, res) => {
  console.log(`Server Started at http://localhost:4000`);
});
