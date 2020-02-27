const { Schema, model } = require('mongoose');

const Participant = model('Participant', new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	contact: { type: String, required: true },
	email: { type: String, required: true },
	institute: { type: String, required: true },
	events: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
		select: false
	},
	group: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
		select: false
	}
}, { timestamps: true }));

module.exports = Participant;
