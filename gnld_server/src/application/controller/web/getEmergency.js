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
				console.log(result[i].user_id);
				await user.find({
					_id: result[i].user_id
				}, async function (err, users) {
					if (err) {
						return res.status(500).send({
							message: "get users'list fail"
						});
					} else {
						for (let j = 0; j < users.length; j++) {

							let temp = {
								user_id: "",
								name: "",
								birth: "",
								address: "",
								phone: "",
								emergency_phone: ""
							}
							temp.user_id = users[i]._id;
							temp.name = users[j].name;
							temp.birth = users[j].birth;
							temp.address = users[j].address;
							temp.phone = users[j].phone;
							temp.emergency_phone = users[j].emergency_phone;

							data.push(temp);
						}
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