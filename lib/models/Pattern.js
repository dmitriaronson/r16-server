const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const patternLimit = 16;
const validatePattern = pattern => pattern.length <= patternLimit;

const schema = new Schema({
  id: { type: String, required: true, index: true },
  tempo: { type: Number, required: true, default: 120 },
  pattern: { type: Array, validate: [validatePattern, `{PATH} exceeds the limit of ${16}`] },
  fx: {
    bitcrush: {
      bits: { type: Number, min: 1, max: 16, validate: [] },
      freq: { type: Number, min: 0, max: 1, validate: [] },
    },
    delay: {
      time: { type: Number, min: 0, max: 1, validate: [] },
      feedback: { type: Number, min: 0, max: 0.95, validate: [] },
      cutoff: { type: Number, min: 0, max: 4000, validate: [] },
    },
  },
});

const Pattern = mongoose.model('Pattern', schema);

module.exports = Pattern;
