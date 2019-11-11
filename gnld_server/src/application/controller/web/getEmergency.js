const express = require('express');
const router = express.Router();
let user = require('../../model/schema/user');
let monitor = require('../../model/schema/monitor');

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
			user.find({
				_id : result.user_id
			},async function(err, users){
				if (err) {
					return res.status(500).send({
					  message: "get users'list fail"
					});
				  } else {
					for (let i = 0; i < users.length; i++) {
		
						let temp = {
						  name:"",
						  birth : "",
						  address : "",
						  phone : "",
						  emergency_phone : ""
						}
						temp.name = users[i].name;
						temp.birth = users[i].birth;
						temp.address = users[i].address;
						temp.phone = users[i].phone;
						temp.emergency_phone = users[i].emergency_phone;
			  
						data.push(temp);
					  }
					  res.status(200).send({
						message: "success",
						data : data
					  });
				  }
			});
		}
	});
}); //get

module.exports = router;