const connectDB = require('./database.js');
const { ItemModel, UserModel } = require('./schemaModels.js');

//ログインユーザの存在とパスワードの整合性チェック処理
const checkUser = async (email, password) => {
    await connectDB()
    const user = await UserModel.findOne({ email: email })

    if (!user) return { status: 400, message: 'user not found!' };

    if (user.password === password) {
        return { status: 200, message: 'login success' }
    } else {
        return { status: 400, message: 'login failed!' }
    }
}

//checkUser関数を外部から呼び出せるようにする
module.exports = checkUser;