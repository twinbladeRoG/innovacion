const { Schema, model } = require('mongoose');

const Variable = model('Variable', new Schema({
  key: { type: String, required: true },
  value: { type: Schema.Types.Mixed }
}, { timestamps: true }));

module.exports = Variable;
