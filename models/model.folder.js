const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    path:{
        type: [String],
        default: [''],
        required: true
    },
    size:{
        type: Number,
        default:0
    }, 
    subFolders:{
        type: [{type: Schema.Types.ObjectId, ref: 'Folder' }]
    },
    subFiles:{
        type: [{type: Schema.Types.ObjectId, ref: 'File' }]
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    }
}, { timestamps: false});


const FolderModel = mongoose.model('File', folderSchema)

module.exports = {FolderModel,folderSchema}