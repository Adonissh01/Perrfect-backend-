const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volunteerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        ref: 'User',
    },
    userName : {
        type:String,
        ref:'User',
        required:true
    },
    
   
    reason: {
        type: String,
        required: true,
        trim:true,
        minlength : [15,"at least 15 letters"],
    },
    rating: {
        type: String,
        trim: true,
    },
    region : {
        type:String,
        ref:'User',
        
    },
    city:{
        type:String,
        ref:'User',
    },
    educationalBackground:{
        type:String,
        required:true,

    },
    availability:{
        type:String,
        required:true,
    },



},
    { timestamps: true }
);
module.exports = mongoose.model("Volunteer", volunteerSchema);