const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserIdByEmail = async (email) => {
  return await prisma.$queryRaw`SELECT id FROM users WHERE email = ${email};`;
};

const hashingPw = async (email, hashedPw) => {
  return await prisma.$queryRaw`INSERT INTO users (email, password) VALUES (${email}, ${hashedPw});`;
};

const getUserPwByEmail = async (email) => {
  return await prisma.$queryRaw`SELECT id, password FROM users WHERE email = ${email};`;
};

const getAllOfUsers = async () => {
  return await prisma.$queryRaw`SELECT email FROM users`;
};

const changePwByEmail = async (email, hashedPw) => {
  return await prisma.$queryRaw`UPDATE users SET password = ${hashedPw} WHERE email = ${email}`;
};

const deleteUserByEmail = async (email) => {
  return await prisma.$queryRaw`DELETE FROM users WHERE email = ${email}`;
};

module.exports = {
  getUserIdByEmail,
  hashingPw,
  getUserPwByEmail,
  getAllOfUsers,
  changePwByEmail,
  deleteUserByEmail,
};
