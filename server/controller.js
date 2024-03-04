const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./service');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.userLoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("EMAIL FOR LOGIN ###");
  console.log(email);
  try {
    const user = await userService.userLoginService(email);
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email',
        success: 0,
      });
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("is password true :::" , isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({
         message: 'Invalid password',
         success: 1,
        });
    }
    delete user.password;
    //const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.userSignupController = async (req, res) => {

  console.log("EMAIL FOR SIGNUP ###");
  console.log(req.body);

  const password = req.body.password;
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  console.log("Hashed Password");
  console.log(req.body.password);
  try {
    console.log("SIGNUP DATA --->");
    console.log(req.body);
    const user = await userService.userSignupService(req.body);
    res.status(201).json(user);
    console.log("SIGNUP SUCCESSFUL...");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
