const { Schema, model } = require('mongoose');

const Event = model('Event', new Schema({
	name: { type: String, required: true },
	description: { type: String }
}, { timestamps: true }));

module.exports = Event;
