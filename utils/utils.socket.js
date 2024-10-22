async function sendGoogleDriveFile(socket, fileId) {
    try {
      const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });
      const fileBuffer = Buffer.from(response.data);
  
      await new Promise((resolve, reject) => {
        socket.emit('fileChunkDrive', {
          fileBuffer
        }, (ack) => {
          if (ack && ack.success) {
            resolve();
          } else {
            console.error("ERROR")
            reject(new Error('Failed to start'));
          }
        });
      });
      
      
      console.log(`Sent fileId: ${fileId}`);
  
    } catch (error) {
      console.error(`Error sending file ID ${fileId}: ${error.message}`);
      socket.emit('error', `Error sending file ${fileId}: ${error.message}`);
    }
}

module.exports = {sendGoogleDriveFile}