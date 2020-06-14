const { Schema, model } = require('mongoose');

const Role = model(
  'Role',
  new Schema(
    {
      type: { type: String, required: true },
      permissions: [{ type: Schema.Types.ObjectId, ref: 'Permissions' }],
    },
    { timestamps: true }
  )
);

module.exports = Role;
