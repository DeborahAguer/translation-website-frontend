// Validate if the email is in the correct format
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Validate password strength (at least 8 characters, one uppercase, one number, and one special character)
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Validate if a string is not empty
  export const validateRequired = (value) => {
    return value.trim() !== '';
  };
  
  // Validate if two passwords match (useful for registration forms)
  export const validatePasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  // Validate if the username meets certain requirements (e.g., minimum length)
  export const validateUsername = (username) => {
    // Example: Username should be at least 5 characters long
    if (!username || username.trim().length < 5) {
      return "Username must be at least 5 characters long";
    }
    return null; // Return null if validation passes
  };
  