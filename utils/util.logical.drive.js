const { FolderModel } = require('../models/model.folder')
const { UserModel } = require('../models/model.user')
const { decodeJWT } = require('../utils/utils.jwt')


const getUserLogicalRootID = async (token) => {

    if(!token) throw Error("Token Not Found : util.logical.drive.js")

    try {
        const {UserId}  = await decodeJWT(token);
        const User = UserModel.findOne({_id:UserId})

        if(!User) throw Error("User Not Found for token : util.logical.drive.js")

        if(User.root){
            const RootFolder = new FolderModel({
                name:"root",
                path:["/"],
                size:0,
                subFolder:[],
                subFiles:[]
            })
            const SavedRoot = await RootFolder.save();
            return SavedRoot._id;
        }else{
            return User.root;
        }

    } catch (error) {
        console.error(error)
    }
}

const createLogicalFile = async (parentFolderId,file) => {
    try {
        


        const LogicalFile = await FolderModel.create({file})//File Validation Awaiting
        const parentFolder = await FolderModel.findOne({_id:parentFolderId})
        const subFolders = parentFolder.subFolders;
        subFolders.push(LogicalFile._id);
        await FolderModel.updateOne({_id:parentFolderId},{subFolders:[...subFolders]})

    } catch (error) {
        console.log(error)
    }
}


const push = async (token) => {

    if(!token) throw Error("Token Not Found : util.logical.drive.js")

    try {
        const {UserId}  = await decodeJWT(token);
        const User = UserModel.findOne({_id:UserId})

        if(!User) throw Error("User Not Found for token : util.logical.drive.js")

        if(User.root){
            const RootFolder = new FolderModel({
                name:"root",
                path:["/"],
                size:0,
                subFolder:[],
                subFiles:[]
            })
            const SavedRoot = await RootFolder.save();
            return SavedRoot._id;
        }else{
            return User.root;
        }

    } catch (error) {
        console.error(error)
    }
}


module.exports = {getUserLogicalRootID,createLogicalFile}