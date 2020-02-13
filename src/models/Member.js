const { Schema, model } = require('mongoose');

const Member = model('Member', new Schema({
	first_name: String,
	last_name: String,
	contact: String,
	email: String
}));

module.exports = Member;