const fcm = require('../module/fcm.js');
let monitor = require('../model/schema/monitor');

/**
푸시
1. 일산화탕소 가스 농도
2. 미세먼지 농도
3. 화분 토양수분
*/

module.exports = {

    co_gas : async (...args) => {
        const user_idx = args[0];

        var msg = "일산화탄소 농도가 너무 높아요! 괜찮으신가요?";
        
        fcm.fcmSend(user_idx, msg, function(err, response){
            if (err) {
                console.log("Push메시지 발송에 실패했습니다.");
                return;
            } 
            console.log("Push메시지가 발송되었습니다.", response);
        });
    },
    fine_dust : async (...args) => {
        const user_idx = args[0];

        var msg = "미세먼지 농도가 너무 높아요! 괜찮으신가요?";
        
        fcm.fcmSend(user_idx, msg, function(err, response){
            if (err) {
                console.log("Push메시지 발송에 실패했습니다.");
                return;
            } 
            console.log("Push메시지가 발송되었습니다.", response);
        });
    },
    soil_water : async (...args) => {
        const user_idx = args[0];

        var msg = "화분이 말라있어요! 괜찮으신가요?";
        
        fcm.fcmSend(user_idx, msg, function(err, response){
            if (err) {
                console.log("Push메시지 발송에 실패했습니다.");
                return;
            } 
            console.log("Push메시지가 발송되었습니다.", response);
        });
    },

    
};
