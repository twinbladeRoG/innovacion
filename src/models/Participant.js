const { Schema, model } = require('mongoose');

const Participant = model('Participant', new Schema({
  first_name: String,
  last_name: String,
  contact: String,
  email: String,
  institute: String
}));

module.exports = Participant;