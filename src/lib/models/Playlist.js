import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  author: String,
  description: String,
  tracks: [{ url: String, date: Date }],
  date: { type: Date, default: Date.now },
});

const Playlist = mongoose.model('Playlist', schema);

export default Playlist;
