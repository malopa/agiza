// utils/auth.js
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// const secret = process.env.JWT_SECRET; // Replace this with a secure random string

// // Function to generate JWT
// const generateToken = (data) => {
//   return jwt.sign(data, secret, { expiresIn: '1d' });
// };

// // Function to hash the password
// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// // Function to compare hashed password with plain text password
// const comparePassword = async (password, hashedPassword) => {
//   return await bcrypt.compare(password, hashedPassword);
// };

// export { generateToken, hashPassword, comparePassword };
