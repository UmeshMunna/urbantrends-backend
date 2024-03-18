const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./service');

//----- To retrieve all users -----//
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----- To handle the user login -----//
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

// ----- To handle the user signup -----//
exports.userSignupController = async (req, res) => {
  console.log("EMAIL FOR SIGNUP ###");
  console.log(req.body);
  console.log(req.file.buffer);


  const { name, mobile, email, address, userType, password } = req.body;

  // Access file data from req.file.buffer
  const profilePicture = req.file ? req.file.buffer : null;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  try {
    const user = await userService.userSignupService({
      name,
      mobile,
      email,
      address,
      userType,
      password: hashedPassword,
      profilePicture
    });
    res.status(201).json(user);
    console.log("SIGNUP SUCCESSFUL...");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};