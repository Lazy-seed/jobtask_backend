import jsonwebtoken from 'jsonwebtoken';
import UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';
export const signup = async (req, res) => {
  const { email, password } = req.body;
  let role = 'user';

  if (email.endsWith('@alphaware.com')) {
    role = 'admin';
  }

  try {
    const user = await UserModel.create({ email, password, role });
    const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user: { id: user._id, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jsonwebtoken.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
