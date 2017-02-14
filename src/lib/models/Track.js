import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  url: String,
});

const Track = mongoose.model('Track', schema);

export default Track;

