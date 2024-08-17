import bcrypt from "bcrypt";

export const createHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
