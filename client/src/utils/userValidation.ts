  export const validateUsername = (username: string): string => {
    if (username.length < 3) return "Username must be at least 3 characters.";
    if (username.length > 30) return "Username must be under 30 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores.";
    return "";
  };

  export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 254) return "Email address is too long.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    return "";
  };

 export const validatePassword = (password: string): string => {
    let errors = "";
    if (password.length < 8) errors += "• Must be at least 8 characters.\n";
    if (password.length > 72) errors += "• Must be under 72 characters.\n";
    if (!/[a-zA-Z]/.test(password)) errors += "• Must contain at least one letter. (A-Z)\n";
    if (!/[0-9]/.test(password)) errors += "• Must contain at least one digit. (0-9)\n";
    if (!/[^a-zA-Z0-9]/.test(password)) errors += "• Must contain at least one special character. (!@#$%^&*...)\n";
    return errors;
  };

