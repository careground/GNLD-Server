const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let monitor = require('../../model/schema/monitor');


router.delete('/:user_idx', async (req, res) => {
    let ID = req.params.user_idx;
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

});

module.exports = router;