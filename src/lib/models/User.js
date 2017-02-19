import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Playlist from './Playlist';

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true, index: true },
  password: { type: String, required: true },
  playlists: [Playlist.schema],
});

schema.pre('save', function hashPassword(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', schema);

export default User;
