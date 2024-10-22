const {google} = require("googleapis");

const connectDrive = () => {
    try{
        const oauth2client = new google.auth.OAuth2(process.env.ClientID,process.env.ClientSecret,process.env.RedirectURL);

        oauth2client.setCredentials({refresh_token:process.env.RefreshToken})
        
        const drive = google.drive({
            version: 'v3',
            auth:oauth2client
        })

        return drive; 
    }catch(e){
        console.log("Error",e);
    }   
}


module.exports = connectDrive



