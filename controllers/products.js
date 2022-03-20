const ProductModel = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    console.log("error is ", error);
    throw new Error("testing async errors");
  }
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, page, limit, numericFilters } =
    req.query;
  let queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const mongooseOperatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${mongooseOperatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { 
          [operator]: Number(value) 
        };
      }
    });
  }

  let result = ProductModel.find(queryObj);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  // this is used for pagination
  const pagination = Number(page);
  const pageLimit = Number(limit);
  const skip = (pagination - 1) * pageLimit;

  result = result.skip(skip).limit(pageLimit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });

};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
