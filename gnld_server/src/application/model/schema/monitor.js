var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var monitorSchema = new Schema({
    admin_id : Number,
    user_id : Number,
    smart_pot_id : Number,
    degree : String,
    create_at : {type : Date, default : Date.now}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('monitor', monitorSchema);