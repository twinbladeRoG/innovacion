const { Schema, model } = require('mongoose');

const Member = model('Member', new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	contact: { type: String, required: true },
	email: { type: String, required: true },
	events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
	roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: true }));

module.exports = Member;
