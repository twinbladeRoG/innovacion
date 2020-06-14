const { Schema, model } = require('mongoose');

const Group = model(
  'Group',
  new Schema(
    {
      name: { type: String, required: true },
      events: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
        select: false,
      },
      participants: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Participant' }],
        select: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Group;
