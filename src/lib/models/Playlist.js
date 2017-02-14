import mongoose from 'mongoose';
import Track from './Track';

const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, index: { unique: true } },
  title: String,
  author: String,
  description: String,
  date: { type: Date, default: Date.now },
  tracks: [Track.schema],
});

const Playlist = mongoose.model('Playlist', schema);

export default Playlist;
