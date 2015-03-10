# Cylon.js For Skynet

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This repository contains the Cylon adaptor for the Skynet ([http://skynet.im](http://skynet.im)) machine to machine instant messaging open source software.

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-skynet.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-skynet) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-skynet/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-skynet) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-skynet/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-skynet)

For more information about Cylon, check out our repo at https://github.com/hybridgroup/cylon

## How to Install

Install the module with:

    $ npm install cylon cylon-skynet

## How to Use

```javascript
var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/tty.usbmodem1411" },
    skynet: { adaptor: "skynet", uuid: "SKYNET_UUID", token: "SKYNET_TOKEN" }
  },

  devices: {
    led: { driver: "led", pin: 13, connection: "arduino" }
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
```

## How to Connect

First, you need to register a device on the Skynet network. You can do this with a curl command similar to this one:

    $ curl -X POST http://meshblu.octoblu.com/devices

This will return the new registration information for the device, most importantly the `uuid` and `token`:

```json
{"geo":{"range":[1344446976,1344447487],"country":"ES","region":"56","city":"Cornellá De Llobregat","ll":[41.35,2.0833],"metro":0},"ipAddress":"80.34.162.160","online":false,"timestamp":"2015-03-05T14:35:23.638Z","uuid":"db895340-c344-11e4-9f09-df7578d68eac","token":"d0a9f0d7e321657a38d25dd492492ffed0baf773"}
```

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.11.0 - Compatibility with Cylon 0.22.0

Version 0.10.0 - Compatibility with Cylon 0.21.0

Version 0.9.0 - Compatibility with Cylon 0.20.0

Version 0.8.0 - Compatibility with Cylon 0.19.0

Version 0.7.0 - Compatibility with Cylon 0.18.0

Version 0.6.0 - Compatibility with Cylon 0.16.0

Version 0.5.1 - Add peerDependencies to package.json

Version 0.5.0 - Compatibility with Cylon 0.15.0

Version 0.4.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.3.0 - Release for Cylon 0.12.0

Version 0.2.0 - Release for Cylon 0.11.0, refactor to pure JavaScript, update to latest messages notifications format on Skynet

Version 0.1.0 - Initial release

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
