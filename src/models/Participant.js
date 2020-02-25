const { Schema, model } = require('mongoose');

const Participant = model('Participant', new Schema({
	first_name: { type: String, required: true},
	last_name: { type: String, required: true},
	contact: { type: String, required: true},
	email: { type: String, required: true},
	institute: { type: String, required: true},
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
	group: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
}, { timestamps: true }));

module.exports = Participant;
