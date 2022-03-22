const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sendDetail = async (req, res) => {
  try {
    const details =
      await prisma.$queryRaw`SELECT P.id, P.korean_name, P.english_name, PI.image_url, json_arrayagg(A.name) , N.caffein, N.fat, N.sugar, N.sodium FROM products P JOIN product_images PI ON PI.product_id = P.id JOIN nutritions N ON N.product_id = P.id LEFT JOIN product_allergies PA ON PA.product_id = P.id LEFT JOIN allergies A ON A.id = PA.allergy_id GROUP BY P.id;`;
    console.log(details);
    return res.status(201).json({ details });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { sendDetail };
