const { Schema, model } = require('mongoose');

const Permission = model('Permission', new Schema({
  name: String
}));

module.exports = Permission;