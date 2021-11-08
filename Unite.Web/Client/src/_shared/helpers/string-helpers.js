/**
 * Verifies if given character is letter.
 * @param {*} char Character to check
 * @returns 'true' if character is letter. 'false' otherwise.
 */
export function isLetter(char) {
  if (char && char.length === 1) {
    return char.match(/[a-zA-Z]/) != null;
  } else {
    return false;
  }
}

/**
 * Verifies if given character is lowercase letter.
 * @param {*} char Character to check
 * @returns 'true' if character is lowercase letter. 'false' otherwise.
 */
export function isLowercaseLetter(char) {
  if (char && char.length === 1) {
    return char.match(/[a-z]/) != null;
  } else {
    return false;
  }
}

/**
 * Verifies if given character is uppercase letter.
 * @param {*} char Character to check
 * @returns 'true' if character is uppercase letter. 'false' otherwise.
 */
export function isUppercaseLetter(char) {
  if (char && char.length === 1) {
    return char.match(/[A-Z]/) != null;
  } else {
    return false;
  }
}

/**
 * Verifies if character is number.
 * @param {*} char Character to check
 * @returns 'true' if character is number. 'false' otherwise.
 */
export function isNumber(char) {
  if (char && char.length === 1) {
    return char.match(/[0-9]/) != null;
  } else {
    return false;
  }
}

/**
 * Verifies if string contains letter.
 * @param {*} str String to check
 * @returns 'true' if string contains letter. 'false' otherwise.
 */
export function hasLetter(str) {
  if (str && str.length) {
    return Array.from(str).some(this.isLetter);
  } else {
    return false;
  }
}

/**
 * Verifies if string contains lowercase letter.
 * @param {*} str String to check
 * @returns 'true' if string contains lowercase letter. 'false' otherwise.
 */
export function hasLowercaseLetter(str) {
  if (str && str.length) {
    return Array.from(str).some(this.isLowercaseLetter);
  } else {
    return false;
  }
}

/**
 * Verifies if string contains uppercase letter.
 * @param {*} str String to check
 * @returns 'true' if string contains uppercase letter. 'false' otherwise.
 */
export function hasUppercaseLetter(str) {
  if (str && str.length) {
    return Array.from(str).some(this.isUppercaseLetter);
  } else {
    return false;
  }
}

/**
 * Verifies if string contains number.
 * @param {*} str String to check
 * @returns 'true' if string contains number. 'false' otherwise.
 */
export function hasNumber(str) {
  if (str && str.length) {
    return Array.from(str).some(this.isNumber);
  } else {
    return false;
  }
}

/**
 * Verifies if string is email address.
 * @param {*} str String to check 
 * @returns 'true' if string is email address. 'false' otherwise.
 */
export function isEmail(str) {
  if (str && str.length) {
    return str.match(/\S+@\S+\.\S+/) != null;
  } else {
    return false;
  }
}

export default {
  isLetter,
  isLowercaseLetter,
  isUppercaseLetter,
  isNumber,
  hasLetter,
  hasLowercaseLetter,
  hasUppercaseLetter,
  hasNumber,
  isEmail
}