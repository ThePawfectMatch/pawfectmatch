const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: false, 
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

userSchema.statics.signup = async function(email, password) {
    
    if(!username || !password) {
        throw Error('Must fill in required fields')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash, email})

    return user
}