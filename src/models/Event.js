const { Schema, model } = require('mongoose');

const Event = model('Event', new Schema({
  name: String
}));

module.exports = Event;