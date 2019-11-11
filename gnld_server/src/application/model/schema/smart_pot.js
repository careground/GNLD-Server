var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var smart_potSchema = new Schema({
    user_id : String,
    soil_water : Number,
    temperature : Number,
    humidity : Number,
    fine_dust : Number,
    co_gas : Number,
    timestamp : {type : Date, default : Date.now}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('smart_pot', smart_potSchema);