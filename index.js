// express server　の設定
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const connectDB = require('./utils/database.js')
const ItemModel = require('./utils/schemaModels.js')


// ルーティングの設定
app.get('/', (req, res) => {
    return res.status(200).json('Hello World!');
});

// ITEM function 
// 追加(create)
app.post('/item/create', async(req, res) => {
    try {
        await connectDB()
        console.log(req.body)
        await ItemModel.readAll()
        await ItemModel.create(req.body)
        return res.status(200).json({message: 'create item!'});
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({message: 'cann`t create item!'})
    }


});

// 変更(update)
// 一覧表示(readAll)
// 一件表示(readSingle)
// 削除(delete)

// USER function 
// 登録(register)
// ログイン(login)


// サーバーの起動
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
