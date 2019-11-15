const express = require('express');
const router = express.Router();
let user = require('../../model/schema/user');
let monitor = require('../../model/schema/monitor');

router.get('/', function (req, res) {
	user_id = "";
	var data = new Array();

	monitor.find({}, async function (err, result) {
		if (err) {
			return res.status(500).send({
				message: "get data fail"
			});
		} else {
			for (let i = 0; i < result.length; i++) {
				await user.find({
					_id: result[i].user_id
				}, async function (err, users) {
					if (err) {
						return res.status(500).send({
							message: "get users'list fail"
						});
					} else {

						let temp = {
							user_id: "",
							name: "",
							birth: "",
							address: "",
							phone: "",
							emergency_phone: ""
						}
						temp.user_id = users[0]._id;
						temp.name = users[0].name;
						temp.birth = users[0].birth;
						temp.address = users[0].address;
						temp.phone = users[0].phone;
						temp.emergency_phone = users[0].emergency_phone;
						//

						data.push(temp);
					}

				}); // user.find
			}
			res.status(200).send({
				message: "success",
				data: data
			});

		}

	});

}); //get

module.exports = router;