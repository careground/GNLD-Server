const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let smart_pot = require('../../model/schema/smart_pot');
let monitor = require('../../model/schema/monitor');

router.post('/', async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    var soil_water_status = "정상";
    var co_gas_status = "정상";
    var fine_dust_status = "정상";

    if (ID != -1) {
        await smart_pot.create({
            user_id: ID,
            soil_water : req.body.soil_water,
            temperature : req.body.temperature,
            humidity : req.body.humidity,
            fine_dust : req.body.fine_dust,
            co_gas : req.body.co_gas
        }, async function (err, pots) {
            if (err) {
                res.status(405).send({
                    message: "fail"
                });
                return;
            }
            else {
                if(pots.soil_water<35){ soil_water_status = "위험"; }
                if(pots.co_gas>=10){ co_gas_status = "위험";}
                if(pots.fine_dust>=50){ fine_dust_status = "위험";}
                if(co_gas_status == "위험" || soil_water_status == "위험" || fine_dust == "위험"){
                    await monitor.find({
                        user_id : pots.user_id
                    },async function (err, monitors) {
                        if (err) {
                            res.status(405).send({
                                message: "fail"
                            });
                        }else{
                            console.log(monitors)
                            if(monitors.length == 0){
                                await monitor.create({
                                    admin_id : 1,
                                    user_id : pots.user_id,
                                    smart_pot_id : pots._id,
                                    degree : "위험"
                                });
                            }else{
                                console.log(monitors[0].user_id);
                                monitor.deleteOne({
                                    user_id : monitors[0].user_id
                                }, async function(err, update){
                                    if(err) 
                                        return res.status(500).send({message: 'database failure'});
                                   
                                });
                                await monitor.create({
                                    admin_id : 1,
                                    user_id : pots.user_id,
                                    smart_pot_id : pots._id,
                                    degree : "위험"
                                });
                            }
                            res.status(201).send({
                                message: "success",
                                soil_water_status : soil_water_status,
                                co_gas_status : co_gas_status,
                                fine_dust_status : fine_dust_status
                            });
                        }
                    });
                }
            }
        });

    } else {
        res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;

