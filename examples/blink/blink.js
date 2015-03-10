// SkyNet cURL requests to create and message devices:

// curl -X POST http://meshblu.octoblu.com/devices

// curl -X POST http://meshblu.octoblu.com/messages \
//   -d '{"devices": "DEVICE_ID", "payload": {"red":"on"}}' \
//   --header "meshblu_auth_uuid: SKYNET_TOKEN" \
//   --header "meshblu_auth_token: SKYNET_UUID"

// curl -X POST http://meshblu.octoblu.com/messages \
//   -d '{"devices": "DEVICE_ID", "payload": {"red":"off"}}' \
//   --header "meshblu_auth_uuid: SKYNET_TOKEN" \
//   --header "meshblu_auth_token: SKYNET_UUID"

var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/tty.usbmodem1411" },
    skynet: { adaptor: "skynet", uuid: "SKYNET_UUID", token: "SKYNET_TOKEN" }
  },

  devices: {
    led: { driver: 'led', pin: 13, connection: 'arduino' }
  },

  work: function(my) {
    my.skynet.on("message", function(data) {
      console.log(data);

      if (data.payload.red === "on") {
        my.led.turnOn();
      } else if (data.payload.red === "off") {
        my.led.turnOff();
      }
    });
  }
}).start();
