var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    email : String,
    password : String,
    name : String,
    phone : String,
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('manager', managerSchema);