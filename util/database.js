import { MongoClient } from 'mongodb'

const url = 'mongodb+srv://ross1222:Dlwnsdud12@querico.1hvq69b.mongodb.net/?retryWrites=true&w=majority'
const options = { useNewUrlParser: true }
let connectDB


if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }