import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, required: true, index: true },
  pattern: [],
});

const Pattern = mongoose.model('Pattern', schema);

export default Pattern;
