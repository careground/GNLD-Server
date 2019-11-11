const express = require('express');
const router = express.Router();
let user = require('../../model/schema/user');
const jwt = require('../../module/jwt');
const hash = require('../../module/hash');


//회원가입 
router.post('/', async (req, res, next) => {

    let password = hash.encoding(req.body.password)
    console.log(password);

    await user.create({
        email: req.body.email,
        password: password,
        name: req.body.name,
        phone: req.body.phone,
        birth: req.body.birth,
        address: req.body.address,
        emergency_phone: req.body.emergency_phone
    }, async function (err, users) {
        if (err) {
            res.status(405).send({
                message: "fail"
            });
            return;
        } else {
            res.status(200).send({
                message: "success"
            });
        }


    });

});

module.exports = router;
