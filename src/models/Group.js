const { Schema, model } = require('mongoose');

const Group = model('Group', new Schema({
  name: String
}));

module.exports = Group;