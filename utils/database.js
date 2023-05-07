// utils/database.js

//Importing Mongoose
const mongoose = require('mongoose')

//.env読み込み
require('dotenv').config()
db_host = process.env.DB_HOST
db_pass = process.env.DB_PASS
db_url = "mongodb+srv://" + db_host + ":" + db_pass + "@cluster0.rh17yru.mongodb.net/appDataBase?retryWrites=true&w=majority"

//Connecting to MongoDB
const connectDB = async() => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB is Connected...')
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = connectDB