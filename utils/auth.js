//create a class to handle json web tokens
const jwt = require("jsonwebtoken")

class Auth {
    constructor(token) {
        this.token = token
    }

    async login(user) {
        const AccessToken = await jwt.sign(user,"secretaccess",{expiresIn:'60s'});
        const RefreshToken = await jwt.sign(user,"secretrefresh",{expiresIn:'7d'});

        const new_token = new this.token({
            AccessToken,
            RefreshToken
        });

        await new_token.save();

        return {
            AccessToken,
            RefreshToken
        }
    }

    async refresh(tkn) {
        //update accesstoken
        try {
            const user = jwt.verify(tkn.RefreshToken,"secretrefresh");
            const AccessToken = jwt.sign({
                username:user.username,
                _id:user._id
            },"secretaccess",{expiresIn:"60s"});
            return await this.token.findOneAndUpdate({
                RefreshToken:tkn.RefreshToken
            },{
                AccessToken
            },{
                new:true
            })
        } catch(e) {
            throw new Error(e)
        }
    }

    async verify(headers) {
        //grab token from header Authorization
        const token = headers["authorization"] && headers["authorization"].split(" ")[1];
        if(!token) {
            throw new Error("Token is missing")
        } else {
            try {
                return await jwt.verify(token,"secretaccess")
            } catch(e) {
                throw new Error(e)
            }
        }
    }
}

module.exports = Auth