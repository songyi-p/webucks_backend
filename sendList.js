const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendList = async (req, res) => {
  try {
    const products =
      await prisma.$queryRaw`SELECT P.id, P.korean_name As koreanName, P.english_name As englishName, C.name As category, C.id As categoryId, PI.image_url As imageUrl FROM products P JOIN categories C ON P.category_id = C.id JOIN product_images PI ON PI.product_id = P.id;`;
    console.log(products);
    return res.status(201).json({ products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { sendList };
