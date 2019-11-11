var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : String,
    password : String,
    name : String,
    phone : String,
    birth : String,
    address : String,
    emergency_phone : String,
    fcm_token : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('user', userSchema);