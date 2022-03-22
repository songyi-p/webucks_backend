const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendCategories = async (req, res) => {
  try {
    const categories = await prisma.$queryRaw`SELECT id, name FROM categories`;
    console.log(categories);
    return res.status(201).json({ categories });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { sendCategories };
