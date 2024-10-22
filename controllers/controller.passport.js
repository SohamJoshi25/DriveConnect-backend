
const {UserModel} = require('../models/model.user')
const {ConnectedAccountModel} = require('../models/model.connectedAccount')
const {generateJWT} = require('../utils/utils.jwt')

const passportCallBack = async (request,accessToken,refreshToken,profile,done) => {
    try {

        const user = {
            name:profile.displayName,     
            email:profile._json.email,
            photoURI:profile.photos[0].value,
        }

        if(request.session.UserId){

            const UserId = request.session.UserId;
            const alias = request.session.alias || "Drive Client";

            if(!refreshToken)return done(null,{error:"Unable to fetch RefreshToken : Passport Error"});

            const C_Account_check = await ConnectedAccountModel.findOne({_id:profile._json.email});
            if(C_Account_check) return done(null,{error:"Account Already Registered"});

            const C_Acc = new ConnectedAccountModel({
                _id:profile._json.email,
                refreshToken:refreshToken,
                alias:alias,
            })

            await C_Acc.save();

            const userDB = await UserModel.findOneAndUpdate(
                { _id: UserId },
                { 
                    $setOnInsert: user, 
                    $push: { connectedAccounts: profile._json.email }
                },
                { new: true, upsert: true }
            );

            return done(null,{success:`Added ${alias}`});


        }else{

            

            console.log(request,profile,accessToken,refreshToken,done)


            const userDB = await UserModel.findOneAndUpdate({email:profile._json.email},{ $setOnInsert: user },{ new: true, upsert: true } );

            const token = await generateJWT(expiresIn="18h",{UserId:userDB._id})

            console.log(token)

            return done(null,{token});
        }


    } catch (error) {
        console.error(error);
        return done(error,"Error Occured");
    }

}

module.exports = passportCallBack