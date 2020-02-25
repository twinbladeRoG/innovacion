const { Schema, model } = require('mongoose');

const Group = model('Group', new Schema({
	name: { type: String, required: true },
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
	participants: [{ type: Schema.Types.ObjectId, ref: 'Participant' }]
}, { timestamps: true }));

module.exports = Group;
