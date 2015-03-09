/*
 * cylon-skynet adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Skynet = require("meshblu"),
    Cylon = require("cylon");

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.uuid = opts.uuid;
  this.token = opts.token;
  this.server = opts.server || "ws://meshblu.octoblu.com";
  this.port = opts.port || 80;
  // this.host = opts.host || "ws://127.0.0.1";
  // this.port = opts.port || 3000;

  var forceNewSet = opts.hasOwnProperty("forceNew");
  this.forceNew = forceNewSet ? opts.forceNew : true;

  this.events = [
    /**
     * Emitted when Skynet has received a new message
     *
     * @event message
     * @value data
     */
    "message"
  ];
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = ["data", "message", "subscribe"];

/**
 * Connects to Skynet
 *
 * @param {Function} callback to be triggered when connected
 * @return {null}
 */
Adaptor.prototype.connect = function(callback) {
  this.connector = Skynet.createConnection({
    uuid: this.uuid,
    token: this.token,
    server: this.host,
    port: this.port,
    forceNew: this.forceNew
  });

  this.connector.once("notReady", function(data) {
    Cylon.Logger.error("Failed to connect to Skynet: '" + this.name + "'");
    Cylon.Logger.error("Check UUID and Token are correct and try again");
    this.emit("notReady", data);
    callback(null);
  }.bind(this));

  this.connector.once("ready", function(data) {
    console.log('Connected to Skynet...');
    this.connector.on("message", function(data){
      this.emit("message", data);
    }.bind(this));

    this.emit("ready", data);

    callback(null);
  }.bind(this));
};

/**
 * Disconnects from Skynet
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {null}
 */
Adaptor.prototype.disconnect = function(callback) {
  callback();
};

Adaptor.prototype.data = function(data) {
  return this.connector.data(data);
};

/**
 * Posts a message to Skynet
 *
 * @param {Object} data to be posted
 * @return {null}
 * @publish
 */
Adaptor.prototype.message = function(data) {
  return this.connector.message(data);
};

/**
 * Subscribes to data from Skynet
 *
 * @param {Object} data
 * @return {null}
 * @publish
 */
Adaptor.prototype.subscribe = function(data) {
  return this.connector.subscribe(data);
};
