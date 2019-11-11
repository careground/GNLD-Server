const express = require('express');
const router = express.Router();
let user = require('../../model/schema/user');
let monitor = require('../../model/schema/monitor');
const db = require('../../module/pool.js');

router.get('/', function (req, res) {
	user_id = "";
	var data = new Array();

	monitor.find({
		degree: "위험"
	}, async function (err, result) {
		if (err) {
			return res.status(500).send({
				message: "get data fail"
			});
		} else {

			for (let i = 0; i < result.length; i++) {

			}
			if (data) {
				res.status(200).send({
					message: "success",
					data: data
				});

			} else {
				res.status(405).send({
					error: "Get data fail"
				});

			}
		}
	

	
	});
}); //get

module.exports = router;