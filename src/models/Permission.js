const { Schema, model } = require('mongoose');

const Permission = model('Permission', new Schema({
	name: { type: String, require: true }
}, { timestamps: true }));

module.exports = Permission;
