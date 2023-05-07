// utils/schemaModels.js
//mongooseの読み込み
const mongoose = require('mongoose');

//スキーマの定義
const Schema = mongoose.Schema

//Itemスキーマの定義
const ItemSchema = new Schema({
    title: String,         
    image: String,
    price:  String,     
    description: String,
    email: String,
})

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})   

exports.ItemModel = mongoose.model("Item", ItemSchema) 
exports.UserModel = mongoose.model("User", UserSchema) 