require('dotenv').config();
const express = require("express");
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const async = require("hbs/lib/async");

const app = express();
const port = process.env.PORT || 3000;
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

//new register
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const registerEmp = new Register({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: password,
        confirmpassword: confirmpassword,
      });

      console.log("the success part" + registerEmp);

      const token = await registerEmp.generateAuthToken();
      console.log("the success token" + token);

      const registered = await registerEmp.save();
      res.status(200).render("index");
    } else {
      res.send("password not match");
    }
  } catch (e) {
    res.status(400).send(e);
    console.log("the success token" + e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();
    console.log("the success token" + token);

    if (isMatch) {
      res.status(200).render("index");
    } else {
      res.send("password not match");
    }
  } catch (e) {
    res.status(400).send("details not valied"); 
  }
});

app.listen(port, () => {
  console.log(`server start at port no. ${port}`);
});
