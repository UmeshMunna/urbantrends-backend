const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//----- To retrieve all users -----//
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user', (error, results) => {
      if (error) {
        reject(error);
        console.log("ERROR");
      } else {
        resolve(results);
        console.log("SUCCESS");

      }
    });
  });
};

//----- To handle the user login -----//
exports.userLoginService = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};


// ----- To handle the user signup -----//
exports.userSignupService = (userData) => {
  return new Promise((resolve, reject) => {
    const { name, mobile, email, address, profilePicture, userType, password } = userData;
    pool.query(
      'INSERT INTO user (name, mobile, email, address, profile_pic, user_type, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, mobile, email, address, profilePicture, userType, password],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({ id: results.insertId, ...userData });
        }
      }
    );
  });
};

