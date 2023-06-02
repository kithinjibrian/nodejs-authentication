const Auth = require("../utils/auth"),
      Token = require("../models/token");

const auth = new Auth(Token)

module.exports = async (req,res) => {
   try {
      const {
         AccessToken
      } = await auth.refresh(req.Token);

      res.status(201).json({AccessToken})
   } catch (e) {
      res.status(500).json({error:e.message})
   }
}