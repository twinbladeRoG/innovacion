const { Schema, model } = require('mongoose');

const Permission = model('Permission', new Schema({
  key: { type: String, required: true },
  description: String
}, { timestamps: true }));

module.exports = Permission;
