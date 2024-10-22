const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectedAccountSchema = new Schema({

    _id:{//Email
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true
    },
    storageUsed:{
        type: Number,
        default:0
    }, 
    createdAt: {
        type: Number,
        default: Date.now,
    },
}, { timestamps: false, _id:false });


const ConnectedAccountModel = mongoose.model('ConnectedAccount', connectedAccountSchema)

module.exports = {ConnectedAccountModel,connectedAccountSchema}