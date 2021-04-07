import bcrypt from 'bcrypt';

export const encryptPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

export const comparePassword = async (plainPassword: string, encryptedPassword: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(plainPassword, encryptedPassword);
  return isValid;
};
