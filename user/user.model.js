const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    name:{tyoe: String},
    image:{type: String},
    profilecompleted:{type: Boolean, default:false},
    premiumuser:{type: Boolean, default:false},
    email : {type: String},
    // email: {type: String , unique: true, required: true, validate:{
    //     validator: function(email){
    //         var re = /\S+@\+.\S+/;
    //         return re.test(email);
    //     }
    // }},
    password: {type: String },
    creatonDate: {type: Date, default: new Date()},
    verified: {type: Boolean, default: false},
    phone: {type: String, validate:{
        validator: function(v){
            return /^([0-9]{$})/.test(v);
        }
    }}
})

const UserModel = mongoose.model('users', userschema)
module.exports = UserModel