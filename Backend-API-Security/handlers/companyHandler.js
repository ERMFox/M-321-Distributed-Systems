const { sanitizer } = require("./dbHandler");

async function getAllCompanies() {
  return transformResponse(await sanitizer("select", "products", {}, {
    columns: "companies.id AS company_id, companies.name AS company_name, products.id AS product_id, products.name AS product_name, products.description, products.price, products.image_data, products.rating",
    join: {
      table: "companies",
      type: "RIGHT",
      on: ["companies.id", "products.company_id"],
    },
  }));
}

async function getOneCompany(id) {
  return transformResponse(await sanitizer("select", "products", {}, {
    columns: "companies.id AS company_id, companies.name AS company_name, products.id AS product_id, products.name AS product_name, products.description, products.price, products.image_data, products.rating",
    join: {
      table: "companies",
      type: "RIGHT",
      on: ["companies.id", "products.company_id"],
    },
    where: "companies.id = ?",
    whereParams: [id],
  }));
}

async function deleteCompany(id) {
  return await sanitizer("delete", "companies", {}, { where: "id = ?", whereParams: [id] });
}

async function updateCompany(id, company) {
  return await sanitizer("update", "companies", company, { where: "id = ?", whereParams: [id] });
}

async function createCompany(company) {
  return await sanitizer("insert", "companies", company);
}

// makes response more readable, making all products a company has be in a list of products
function transformResponse(data) {
  const companies = {};

  data.forEach(item => {
    if (!companies[item.company_id]) {
      companies[item.company_id] = {
        company_id: item.company_id,
        company_name: item.company_name,
        products: [],
      };
    }

    companies[item.company_id].products.push({ name: item.product_name, id: item.product_id, description: item.description, price: item.price, image_data: item.image_data, rating: item.rating });
  });

  return Object.values(companies);
}

module.exports = {
  getAllCompanies,
  getOneCompany,
  deleteCompany,
  updateCompany,
  createCompany,
};
