const { v4: uuidv4 } = require('uuid');
const mongoose = require("mongoose")
const schema = mongoose.Schema
const crypto = require('crypto')

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchase: {
        type: Array,
        default: []
    }
}, { timestamp: true });

userSchema.virtual("password")
    .set(function(password) {
        this._password = password
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex')
        } catch (err) {
            return "";
        }
    }
}
module.exports = mongoose.model("user", userSchema)