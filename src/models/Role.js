const { Schema, model } = require('mongoose');

const Role = model('Role', new Schema({
	type: String
}));

module.exports = Role;