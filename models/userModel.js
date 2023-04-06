const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your fullname"],
        trim: true,
        minlength: 5,

    },
    userName: {
        type: String,
        unique: true,
        required: [true, "Please enter your username"],
        minlength: 5,
        maxlength: 15,

    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"],
        maxLength: 30,
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
        required: [true, "Please enter your password"],
    },
    passwordConfirm: {
        type: String,
        minlength: 8,
        trim: true,
       
    },

    phoneNumber: {
        type: String,
        unique: true,
        require : [true,"Please enter your phone number"],
        minlength: 8,
        trim: true,

    },
    region: {
        type: String,
        required: true,
        lowercase:true,

    },
    city: {
        type: String,
        required: true,
    },
    age:{
        type:String,
        required:[true,"Please enter your Age"]
    },
    gender:{
        type:String,
        required:[true,"Please enter your Gender"],
    },
},

    { timestamps: true }
);

module.exports = mongoose.model("User",userSchema);