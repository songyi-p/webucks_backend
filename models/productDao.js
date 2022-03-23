const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategoryList = async () => {
  return await prisma.$queryRaw`SELECT id, name FROM categories`;
};

const getProductList = async () => {
  return await prisma.$queryRaw`SELECT P.id, P.korean_name As koreanName, P.english_name As englishName, C.name As category, C.id As categoryId, PI.image_url As imageUrl FROM products P JOIN categories C ON P.category_id = C.id JOIN product_images PI ON PI.product_id = P.id;`;
};

const getDetail = async () => {
  return await prisma.$queryRaw`SELECT P.id, P.korean_name, P.english_name, PI.image_url, json_arrayagg(A.name) , N.caffein, N.fat, N.sugar, N.sodium FROM products P JOIN product_images PI ON PI.product_id = P.id JOIN nutritions N ON N.product_id = P.id LEFT JOIN product_allergies PA ON PA.product_id = P.id LEFT JOIN allergies A ON A.id = PA.allergy_id GROUP BY P.id, PI.image_url;`;
};

module.exports = { getCategoryList, getProductList, getDetail };
