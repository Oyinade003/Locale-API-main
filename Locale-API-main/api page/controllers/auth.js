// const User = require('../models/'); // Assuming you have a User model
const jwt = require('jsonwebtoken'); // For generating JWTs

// ... implement functions for registration, login, and API key generation
//Registration
const register = async (data) => {
  try {
    const { username, email, password } = data;

    // Validate user data (e.g., email format, password strength)

    // Hash the password using a secure hashing algorithm (e.g., bcrypt)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new User object with hashed password and empty apiKey
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      apiKey: "",
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a unique API key for the user (more on this later)
    const apiKey = generateUniqueApiKey();

    // Update the user's apiKey in the database
    newUser.apiKey = apiKey;
    await newUser.save();

    // Return a success message or relevant user information
    return { message: "Registration successful!", user: { username, email } };
  } catch (error) {
    console.error('Error registering user:', error);
    // Handle errors appropriately (e.g., sending error response with details)
    throw error;
  }
};

//Login
const login = async (data) => {
  try {
    const { email, password } = data;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // Handle invalid email error
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Handle invalid password error
      throw new Error('Invalid email or password');
    }

    // User login successful, return relevant information (excluding password)
    return { message: "Login successful!", user: { username: user.username, email: user.email } };
  } catch (error) {
    console.error('Error logging in user:', error);
    // Handle errors appropriately (e.g., sending error response with details)
    throw error;
  }
};



module.exports = {
  register,
  login,
};
