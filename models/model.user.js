const mongoose = require('mongoose');

const {connectedAccountSchema} = require('./model.connectedAccount')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{//Email
        type: String,
        required: true
    },
    root:{ 
        type: Schema.Types.ObjectId,
        ref: 'Folder' 
    },
    photoURI:{
        type:String,
    },
    connectedAccounts:{
        type: [String]
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    }
}, { timestamps: false });


const UserModel = mongoose.model('User', userSchema)

module.exports = {userSchema,UserModel}
