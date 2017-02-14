import mongoose from 'mongoose';
import findOrCreate from 'mongoose-find-or-create';

const Schema = mongoose.Schema;

const schema = new Schema({
  email: String,
  name: String,
});

schema.plugin(findOrCreate);

const User = mongoose.model('User', schema);

export default User;
