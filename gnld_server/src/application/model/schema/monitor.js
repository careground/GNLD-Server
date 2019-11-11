var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var monitorSchema = new Schema({
    admin_id : String,
    user_id : String,
    smart_pot_id : String,
    degree : String,
    soil_water_status : String,
    co_gas_status : String,
    fine_dust_status : String,
    create_at : {type : Date, default : Date.now}
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('monitor', monitorSchema);