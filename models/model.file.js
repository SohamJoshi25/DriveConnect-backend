const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    size:{
        type: Number,
        default:0
    }, 
    type:{
        type: String,
        default:"Others"
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    downloadedAt: {
        type: Number,
        default: Date.now,
    },
    splitParts:{
        type:[String],   
    },
    splitSize:{
        type:Number,
    },
    encryptionType:{
        type:String,
        default:"none"
    },
    encryptionKey:{
        type:String,
        default:"none"
    }

}, { timestamps: false });


const FileModel = mongoose.model('File', fileSchema)

module.exports = {FileModel,fileSchema}