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
            for (let i = 0; i < result.length; i++) {

                let temp = {
                    user_idx: "",
                    password: ""
                }
                temp.user_idx = result[i]._id;
                temp.password = result[i].password;

                data.push(temp);
            }
            console.log(data)

            await user.find({
                password: hash.decoding(data[0].password)
            }, function (err, obj) {
                if (err) {
                    res.status(401).send({
                        message: 'wrong password'
                    });
                } else {
                    const token = jwt.sign(data[0].user_idx);

                    user.update({ _id: data[0].user_idx }, { $set: {'fcm_token' : fcm_token} }, function (err, output) {
                        if (err) res.status(500).json({ error: 'database failure' });
                        if (!output.n) return res.status(404).json({ error: 'user not found' });
                        res.status(200).json({
                            message: 'login success',
                            token: token
                        });
                    })
                }
            });

        }
    })
});

module.exports = router;
