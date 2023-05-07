// utils/schemaModels.js
//mongooseの読み込み
const mongoose = require('mongoose');

//スキーマの定義
const Schema = mongoose.Schema

//Itemスキーマの定義
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    }
})

exports.ItemModel = mongoose.model('Item', ItemSchema)