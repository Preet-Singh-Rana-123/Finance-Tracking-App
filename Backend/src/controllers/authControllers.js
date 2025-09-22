import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

export const postRegister = async (req, res, next) => {
  try {
    const { name, email, password, profile_pic_url } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      password: hashedPassword,
      profile_pic_url,
    });

    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.log('Error while checking auth status', err);
    res.status(500).json({ message: 'Internal error occurred' });
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE_TIME },
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.log('Error while checking auth status', err);
    res.status(500).json({ message: 'Internal error occurred' });
  }
};
