let monitor = require('../model/schema/monitor');
let user = require('../model/schema/user');
const FCM = require('fcm-node');
const fcmserverkey = require('../../config/fcmserverkey').key;
const fcm = new FCM(fcmserverkey);

module.exports = {

  fcmSend: async (...args) => {

    let user_idx = args[0];
    let msg = args[1];
    var name = "";
    var fcmTokenResult = "";

    console.log("msg : ", msg);

    // fcm_token 조회
    await user.find({
      _id: user_idx
    }, async function (err, result) {
      if (err) {ß
        return res.status(401).send({
          message: 'wrong user_idx'
        });
      } else {
        console.log("1. user result : ",result[0])
        name = result[0].name;
        fcmTokenResult = result[0].fcm_token;
      }
    });

    console.log("2. ", fcmTokenResult);
    console.log("3. ", name);

    /** 발송할 Push 메시지 내용 */
    let client_token = fcmTokenResult;

    let push_data = {

      // 수신대상
      to: client_token,

      // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
      notification: {
        title: name + "님! 위험상태 감지!",
        body: msg,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY"
      },

      // 메시지 중요도
      priority: "high",
      // App 패키지 이름
      restricted_package_name: "com.gnld",

      data: {
        title: name + "님! 위험상태가 감지되었습니다.",
        body: msg
      }
    };

    console.log("body : ", push_data.notification.body);

    fcm.send(push_data, function (err, response) {
      if (err) {
        console.log("FCM Failure. Something has gone wrong!");
        console.log(1, err);
        console.log(2, response);
        return -1;
      }
      console.log("Successfully sent with response: ", response);

    });

    return;
  }
}