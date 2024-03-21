import { User } from './user.js'; // Import the User model
import jwt from 'jsonwebtoken'; // For generating JWTs
import bcrypt from 'bcrypt'; // For password hashing
import crypto from 'crypto';

const generateUniqueApiKey = async () => {
  let apiKey;
  let isUnique = false;

  while (!isUnique) {
    apiKey = crypto.randomBytes(16).toString('hex');

    // Check if the API key already exists in the database
    const existingUser = await User.findOne({ apiKey });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return apiKey;
};


// Registration
export const register = async (data) => {
  try {
    const { username, email, password } = data;
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('Username or email already exists');
    }
    // Create a new User object with the provided data
    const newUser = new User({ username, email, password });
    // Generate a unique API key for the user
    const apiKey = await generateUniqueApiKey();
    newUser.apiKey = apiKey;
    // Save the new user to the database
    await newUser.save();
    // Return a success message or relevant user information
    return { success: true, apiKey };
  } catch (error) {
    return { error: error.message };
  }
};

// Login
export const login = async (data) => {
  try {
    const { email, password } = data;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // User login successful, return relevant information (excluding password)
    return { message: 'Login successful!', user: { username: user.username, email: user.email } };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};


