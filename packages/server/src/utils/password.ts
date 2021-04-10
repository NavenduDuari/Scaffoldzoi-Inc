import bcrypt from 'bcrypt';

export const encryptPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    console.log('pass hash len :: ', hash.length);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

export const comparePassword = async (plainPassword: string, encryptedPassword: string): Promise<boolean> => {
  console.log(plainPassword, encryptedPassword);
  const isValid = await bcrypt.compare(plainPassword, encryptedPassword);
  return isValid;
};
