const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let user = require('../../model/schema/user');

router.post('/', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const fcm_token = req.body.fcm_token;

    var data = new Array();

    await user.find({
        email: email
    }, async function (err, result) {
        if (err) {
            return res.status(401).send({
                message: 'wrong email'
            });
        } else {
            if (result.length == 0) {
                return res.status(401).send({
                    message: 'wrong email'
                });
            } else {
                console.log(1, result[0])
                let decode_pw = hash.decoding(result[0].password);
                console.log(2, decode_pw)
                console.log(3, password)
                
                if (password == decode_pw) {
                    const token = jwt.sign(result[0]._id);

                    user.update({ _id: result[0]._id }, { $set: { 'fcm_token': fcm_token } }, function (err, output) {
                        if (err) res.status(500).json({ error: 'database failure' });
                        if (!output.n) return res.status(404).json({ error: 'user not found' });
                        res.status(200).send({
                            message: 'login success',
                            token: token
                        });
                    });
                } else {
                    res.status(401).send({
                        message: 'wrong password'
                    });
                }

            }
        }

    });

});

module.exports = router;
