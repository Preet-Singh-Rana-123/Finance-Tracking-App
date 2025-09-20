import Users from '../models/Users';

exports.postRegister = async (req,res,next) => {
  try {
    const {name, email, passowrd, profile_pic_url} = req.body;
    const user = new Users(name, email, passowrd, profile_pic_url);
    user.save();
    res.status(201).json({message: "User registered"})
  } catch (err) {
    console.log('Error while checking auth status', err);
    res.status(500).json({ message: 'Internal error ocurred' });
  }
}

exports.postLogin = (req,res,next) => {

}