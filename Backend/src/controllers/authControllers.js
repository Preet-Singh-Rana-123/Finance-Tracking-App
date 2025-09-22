import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

exports.postRegister = async (req, res, next) => {
  try {
    const { name, email, passowrd, profile_pic_url } = req.body;

    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hasedPassword = await bcrypt.hash(passowrd, 10);
    const user = new Users({
      name,
      email,
      passowrd: hasedPassword,
      profile_pic_url,
    });
    user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.log('Error while checking auth status', err);
    res.status(500).json({ message: 'Internal error ocurred' });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE_TIME },
    );

    res.status(201).json({ message: 'login successfully', token });
  } catch (err) {
    console.log('Error while checking auth status', err);
    res.status(500).json({ message: 'Internal error ocurred' });
  }
};
