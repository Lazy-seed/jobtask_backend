import bcrypt from 'bcryptjs'; // Correct import syntax for CommonJS module
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Use bcrypt.hash
  next();
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password); // Use bcrypt.compare
};

const User = model('User', userSchema);
export default User;
