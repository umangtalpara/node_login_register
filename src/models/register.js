const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    number:{
        type:Number,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
    },
    confirmpassword:{
        type:String,
        require:true,
    }
})

const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register;