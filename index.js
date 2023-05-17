// express server　の設定
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const jwt = require('jsonwebtoken');
const connectDB = require('./utils/database.js');
const { ItemModel, UserModel } = require('./utils/schemaModels.js');
// checkUser関数を呼び出す
const checkUser = require('./utils/user.js');
const auth = require('./utils/auth.js');
const cors = require('cors');
app.use(cors());


// Read All Items
app.get("/", async (req, res) => {
    try {
        await connectDB()
        const allItems = await ItemModel.find()
        return res.status(200).json({ message: "アイテム読み取り成功（オール）", allItems: allItems })
    } catch (err) {
        return res.status(400).json({ message: "アイテム読み取り失敗（オール）" })
    }
})

// Read Single Item
app.get("/item/:id", async (req, res) => {
    try {
        await connectDB()
        const item = await ItemModel.findById(req.params.id)
        return res.status(200).json({ message: "アイテム読み取り成功（シングル）", item: item })
    } catch (err) {
        return res.status(400).json({ message: "アイテム読み取り失敗（シングル）" })
    }
})


// ITEM function 
// 追加(create)
app.post('/item/create', auth, async (req, res) => {
    console.log(req.body)
    try {
        await connectDB()
        await ItemModel.create(req.body)
        return res.status(200).json({ message: 'create item!' });
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: 'cann`t create item!' })
    }
});

// 変更(update Item)
app.put('/item/update/:id', auth, async (req, res) => {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        if (singleItem.email === req.body.email) {
            // idを指定してreq.bodyの内容で更新
            await ItemModel.updateOne({ _id: req.params.id }, req.body)
            return res.status(200).json({ message: 'update item!' })
        } else {
            return res.status(400).json({ message: 'you are not owner!' })
        }
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: 'cann`t update item!' })
    }
});

// 削除(delete)
app.delete('/item/delete/:id', auth, async (req, res) => {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        // idを指定して削除
        if (singleItem.email === req.body.email) {
            await ItemModel.deleteOne({ _id: req.params.id })
            return res.status(200).json({ message: 'delete item!' })
        } else {
            return res.status(400).json({ message: 'you are not owner!' })
        }
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: 'cann`t delete item!' })
    }
});

// USER function 
// 登録(register)
app.post('/user/register', async (req, res) => {
    try {
        await connectDB()
        await UserModel.create(req.body)
        return res.status(200).json({ message: 'register user!' });
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: 'cann`t register user!' })
    }
});

// jwtのシークレットキー
const secret_key = "mern-market"

// ログイン(login)
app.post('/user/login', async (req, res) => {
    try {
        const result = await checkUser(req.body.email, req.body.password);
        let token = ""
        // JWTの生成
        if (result.status === 200) {
            const payload = { email: req.body.email };
            token = jwt.sign(payload, secret_key, { expiresIn: '1h' });
            console.log(token)
        }

        return res.status(result.status).json({ message: result.message, token: token });
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: 'cann`t login user!' });
    }
});


// サーバーの起動
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});
