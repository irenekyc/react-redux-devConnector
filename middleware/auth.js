const jwt = require('jsonwebtoken')
const config = require ('config')

//middleware has to deal with next
module.exports = function(req, res, next) {

    //GET the token from the header
    const token = req.header('x-auth-token')

    //Check if no token

    if (!token) {
        return res.status(401).json({ msg: 'No Token,  authorization denied'})
    }
    //Verify token
    try {

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user //user (this is set up in the payload)
        next()

    }
    catch(err){
        res.status(401).json({msg: "Token is not valid"})

    }


}