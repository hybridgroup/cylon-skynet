// SkyNet curls to create and message devices

// curl -X POST http://meshblu.octoblu.com/devices
// {"geo":{"range":[1344446976,1344447487],"country":"ES","region":"56","city":"CornellÃ¡ De Llobregat","ll":[41.35,2.0833],"metro":0},"ipAddress":"80.34.162.160","online":false,"timestamp":"2015-03-05T14:35:23.638Z","uuid":"db895340-c344-11e4-9f09-df7578d68eac","token":"d0a9f0d7e321657a38d25dd492492ffed0baf773"}

// curl -X POST -d '{"devices": "db895340-c344-11e4-9f09-df7578d68eac", "payload": {"red":"on"}}' http://meshblu.octoblu.com/messages --header "meshblu_auth_uuid: db895340-c344-11e4-9f09-df7578d68eac" --header "meshblu_auth_token: d0a9f0d7e321657a38d25dd492492ffed0baf773"
// curl -X POST -d '{"devices": "db895340-c344-11e4-9f09-df7578d68eac", "payload": {"red":"off"}}' http://meshblu.octoblu.com/messages --header "meshblu_auth_uuid: db895340-c344-11e4-9f09-df7578d68eac" --header "meshblu_auth_token: d0a9f0d7e321657a38d25dd492492ffed0baf773"

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/tty.usbmodem1411" })
  .connection("skynet", {
    adaptor: "skynet",
    uuid: "SKYNET_UUID",
    token: "SKYNET_TOKEN"
  })
  .device("led", { driver: "led", pin: 13, connection: "arduino" })
  .on("ready", function(my) {
    my.skynet.on("message", function(data) {
      console.log(data);

      if (data.payload.red === "on") {
        my.led.turnOn();
      } else if (data.payload.red === "off") {
        my.led.turnOff();
      }
    });
  })
  .start();
