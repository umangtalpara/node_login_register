const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  number: {
    type: Number,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmpassword: {
    type: String,
    require: true,
  },
  tokens:[{
      token:{
        type: String,
        require: true,
      }
  }]
});


//generate token
employeeSchema.methods.generateAuthToken = async function() {
  try {
    const token = await jwt.sign({ _id: this._id.toString()},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token;
  }
   catch (error) {
    res.send("the error part" + error);
    console.log("the error part" + error);
  }
};

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmpassword = await bcrypt.hash(this.password, 10);;
  }
  next();
});

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;
