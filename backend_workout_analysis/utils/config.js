require("dotenv").config()
let mongoUrl=process.env.MONGODB_URI

if(process.env.NODE_ENV==='test'){
  mongoUrl=process.env.TEST_MONGODB_URI
}
console.log(mongoUrl)

const port=process.env.PORT

module.exports = { mongoUrl, port }
