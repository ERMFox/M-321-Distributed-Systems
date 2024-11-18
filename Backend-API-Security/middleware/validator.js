// this function validates fields of post and put methods on /users and /products
async function validateFields(req, res, next) {
  const allrequired = req.method === "POST";
  let requiredFields = [];

  switch (true) {
  case req.originalUrl.startsWith("/products"):
    requiredFields = ["name", "price", "image_data", "description", "rating", "company_id"];
    break;
  case req.originalUrl.startsWith("/users"):
    requiredFields = ["user", "email", "password", "role_id"];
    break;
  default:
    return res.status(400).send("Invalid endpoint");
  }

  if (allrequired) {
    const hasAllFields = requiredFields.every(field => req.body.hasOwnProperty(field));
    if (!hasAllFields) {
      return res.status(400).send("Missing required fields");
    }
  } else {
    const hasAnyField = requiredFields.some(field => req.body.hasOwnProperty(field));
    if (!hasAnyField) {
      return res.status(400).send("At least one field is required for update");
    }
  }

  next();
}

module.exports = validateFields;