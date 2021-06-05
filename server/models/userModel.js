const mongoose = require('mongoose')
const MODEL_NAME = 'userProfiles'
const COLLECTION_NAME = 'users'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Xin mời nhập họ tên'],
        maxLength: [30, 'Họ tên không quá 30 kí tự']
    },

    email: {
        type: String,
        required: [true, 'Xin mời nhập email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            'Xin mời nhập email hợp lệ']
    },
    password: {
        type: String,
        required: [true, 'Xin mời nhập mật khẩu'],
    },
    avatar:{
        public_id: {
            type: String,
            default: "avatar_default.jpg"
        
        },
        url: {
            type: String,
            default: "https://res.cloudinary.com/dwgximj2j/image/upload/v1622192495/avatars/bcxeglrzxde9m7byob0x.jpg"
        }
    },

    role: {
        type: String,
        erum: ['admin', 'user'],
        default: 'user'
    },
    // resetPasswordToken: String,
    // resetPasswordExpire: Date
}, { timestamps: true })


const userModel = mongoose.model(MODEL_NAME, userSchema, COLLECTION_NAME)

module.exports = userModel