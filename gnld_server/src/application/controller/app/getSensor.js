const express = require('express');
const router = express.Router();
let user = require('../../model/schema/user');
const jwt = require('../../module/jwt.js');
let smart_pot = require('../../model/schema/smart_pot');
let monitor = require('../../model/schema/monitor');

router.get('/', async (req, res) => {
    let data = new Array();
    var soil_water = true;
    var temperature = true;
    var fine_dust = true;
    var co_gas = true;

    const ID = jwt.verify(req.headers.authorization);
    if (ID != -1) {
        smart_pot.find({
            user_id: ID
        }, async function (err, pots) {
            if (err) {
                return res.status(500).send({
                    message: "get users'list fail"
                });
            } else {
                for (let i = 0; i < pots.length; i++) {

                    if (pots[i].soil_water < 35) { soil_water = false }
                    if (pots[i].co_gas > 10) { co_gas = false }
                    if (pots[i].fine_dust >= 100) { fine_dust = false }
                    if (pots[i].temperature <= 21 || pots[i].temperature >= 33) { temperature = false }

                }
                res.status(200).send({
                    message: "success",
                    soil_water: soil_water,
                    temperature:  temperature,
                    fine_dust: fine_dust,
                    co_gas: co_gas
                });
            }
        }).sort({ _id: -1 }).limit(1);

    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;