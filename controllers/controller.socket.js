const {sendGoogleDriveFile} = require('../utils/utils.socket')
const fs = require('fs');
const path = require('path');
const TEMP_FILES = ['1V8svKfSWpQDCDIrGzxpcoLtYnhCVOErM','1yGRfEar90nEcmmGqmWIqPCTpOsYhX85l','1nAxZEkZIYUe_P-l0zDCL8GhOJ5aRB91O','12cODB_a_L4vuUUJnHDfe5GBcx8CfpoGQ','1r91ES_tHw0MBnc0_tt2VOpOdZxSs2WN9','1JkgZeqib7JqXaNmII1XZAMDowUX4XTcq']
const TEMP_ROOT = '1gQ67b9oIq4UcL5TR8YBhLbb0tESVIS8D'
const connectDrive = require('../services/service.connectDrive');
const { getUserLogicalRootID, createLogicalFile } = require('../utils/util.logical.drive');

const drive = connectDrive();

const socketOnConnect =  (socket) => {
    console.log('Client connected',socket.id);
}

const socketOnStartUpload =  async ({ fileName, fileSize, totalChunks, token },callback) => {

    const root = await getUserLogicalRootID(token)

    const newFileId = await createLogicalFile(root,{
        
    })

    console.log(`Started receiving file: ${fileName}, Size: ${fileSize}`);

    try {

        const response = await drive.files.create({
        resource: {
            name: "DriveConnectFiles",
            mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
        });

        folderID =  response.data.id;

        console.log('Root Folder ID:', response.data.id);
        callback({ success: true })
        
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }

};

const socketOnFileChunk  = async (data, callback) => {

    const { chunk, currentChunk, fileName } = data;

    console.log(`Received chunk ${currentChunk + 1}`);

    const fileMetadata = {
        name: fileName+"._"+currentChunk,
        parents: [folderID],
    };

    const bufferChunk = Buffer.from(chunk); // Create a Buffer from ArrayBuffer

    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(bufferChunk);
    stream.push(null);
        
    const media = {
        mimeType: 'application/octet-stream',
        body: stream,
    };
    
    try {

        const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
        });

        filesID.push(response.data.id);
        console.log(`Chunk ${currentChunk} Uploaded File ID:`, response.data.id);
        callback({ success: true })

    } catch (error) {
        console.error('Error uploading file:', error);
    }

};

const socketOnEnd =  ({ fileName }) => {
    console.log(`File upload completed: ${fileName}`);
};

const socketOnDisconnect = (r) => {
    console.log('Client disconnected',r);
};

const socketOnDownloadFiles =  async () => {
    try {
        console.log("Streaming Started Server",socket.id)
        for (const fileId of TEMP_FILES) {
        await sendGoogleDriveFile(socket, fileId);
        }
        console.log("Streaming Completed Server")
        socket.emit('allFilesComplete');  // Notify the client that all files have been streamed
    } catch (error) {
        socket.emit('error', 'Error processing files');
    }
};

module.exports = {socketOnConnect,socketOnEnd,socketOnDisconnect,socketOnDownloadFiles,socketOnFileChunk,socketOnStartUpload}
