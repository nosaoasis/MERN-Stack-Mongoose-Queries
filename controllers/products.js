const getAppProductsStatic = (req, res) => {
  throw new Error("testing async errors")
  res.status(200).json({msg: "product testing route"})
}

const getAppProducts = (req, res) => {
  res.status(200).json({msg: "product  route"})
}

module.exports = {
  getAppProductsStatic,
  getAppProducts
}