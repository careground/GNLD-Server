const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let monitor = require('../../model/schema/monitor');


router.delete('/', async (req, res) => {
    const ID = jwt.verify(req.headers.authorization);
    if (ID != -1) {
        monitor.remove({
            user_id: ID
        }, function (err, savings) {
            if (err) {
                return res.status(500).send({ message: 'database failure' });
            } else {
                res.status(200).send({
                    message: "success"
                });
            }

            return;
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;