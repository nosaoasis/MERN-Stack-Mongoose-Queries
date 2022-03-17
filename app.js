require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const connectDB = require("./db/connect")

const Products = require("./routes/products")

const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler")

app.use(express.json())

app.use("/api/v1/products", Products)

app.get('/', (req, res) => {
  res.send("Hello from mern stack4 <p><a href='/api/v1/products'>Products</a></p>")
})

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()
