export interface ValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Username Requirements:
 * - 3-20 characters
 * - Alphanumeric, underscores, dots, hyphens
 * - No symbols at start/end
 * - No double symbols (.. , --, __, .-, etc.)
 * - No spaces
 */
export const validateUsername = (username: string): ValidationResult => {
  const min = 3;
  const max = 20;

  if (username.length < min || username.length > max) {
    return { isValid: false, message: `Username must be ${min}-${max} characters.` };
  }

  if (/\s/.test(username)) {
    return { isValid: false, message: "Username cannot contain spaces." };
  }

  // Check for symbols at start or end
  if (/^[._-]/.test(username) || /[._-]$/.test(username)) {
    return { isValid: false, message: "Cannot start or end with a symbol." };
  }

  // Check for double symbols (any combination of . - _)
  if (/[._-]{2,}/.test(username)) {
    return { isValid: false, message: "Cannot contain consecutive symbols." };
  }

  // Final check for allowed characters
  const validChars = /^[a-zA-Z0-9._-]+$/;
  if (!validChars.test(username)) {
    return { isValid: false, message: "Only letters, numbers, and . - _ allowed." };
  }

  return { isValid: true, message: "" };
};

/**
 * Password Requirements:
 * - 8-26 characters
 * - Min 1 uppercase, 1 lowercase, 1 number
 */
export const validatePassword = (password: string): ValidationResult => {
  if (password.length < 8 || password.length > 26) {
    return { isValid: false, message: "Password must be 8-26 characters." };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Need at least one uppercase letter." };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "Need at least one lowercase letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Need at least one number." };
  }
  return { isValid: true, message: "" };
};

/**
 * Email Requirements:
 * - Must contain "@"
 * - Prefix: 1-64 characters, dots allowed to separate segments
 * - Domain: dots allowed for subdomains
 * - TLD (Top Level Domain): 2-3 characters after final dot
 */
export const validateEmail = (email: string): ValidationResult => {
  // Regex breakdown:
  // ^[a-zA-Z0-9._%+-]{1,64} -> Prefix 1-64 chars
  // @[a-zA-Z0-9.-]+         -> @ then domain/subdomains
  // \.[a-zA-Z]{2,3}$        -> Final dot then 2-3 char TLD
  const emailRegex = /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

  if (!email.includes("@")) {
    return { isValid: false, message: "Email must contain an @ symbol." };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Invalid email format (check TLD length)." };
  }

  return { isValid: true, message: "" };
};