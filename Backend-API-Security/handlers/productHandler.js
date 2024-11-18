const { sanitizer } = require("./dbHandler");

async function getAllProducts() {
  return await sanitizer("select", "products");
}

async function getOneProduct(id) {
  return await sanitizer("select", "products", {}, { where: "id = ?", whereParams: [id] });
}

async function deleteProduct(id) {
  return await sanitizer("delete", "products", {}, { where: "id = ?", whereParams: [id] });
}

async function updateProduct(id, product) {
  return await sanitizer("update", "products", product, { where: "id = ?", whereParams: [id] });
}

async function createProduct(product) {
  return await sanitizer("insert", "products", product);
}

module.exports = {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
