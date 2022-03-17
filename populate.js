require("dotenv").config()

const connectDB = require("./db/connect")
const Product = require("./models/products")

const jsProucts = require('./products.json')


const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsProucts)
    console.log("Connected");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

startApp()