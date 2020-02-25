const { Schema, model } = require('mongoose');

const Variable = model('Variable', new Schema({
	key: String,
	value: Object
}, { timestamps: true }));

module.exports = Variable;
