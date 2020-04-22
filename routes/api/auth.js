const express = require ('express')
const router = express.Router()
const auth = require ('../../middleware/auth')
const User = require ('../../models/User')
const jwt = require('jsonwebtoken')
const config = require ('config')
const {check, validationResult} = require ('express-validator/check')
const bcrypt = require ('bcryptjs')

//@route    Get api/auth
//@desc     Test Route
//@access   PUBLIC
router.get('/', auth, async (req, res)=>{
    //send back user data
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})
//@route    Post api/auth
//@desc     Authenticate user & get token
//@access   PUBLIC

router.post('/', 
    [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists() 
    ]
    , async (req, res)=>{
    const errors = validationResult(req);
//Check validation
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})}

    const { email, password } = req.body

    try {
        
        // see if the user exists
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors: [ { msg: 'Invalid Credentials'}]})
        }
        
        //Compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({errors: [ { msg: 'Invalid Credentials'}]})
        }

        //Return JSONWEBTOKEN (login right away after registering)
        const payload = {
            user: {
                id: user.id
            }
        }
        //jwt.sign(arguments: payload, jwt secret, options(expiresIn), call back function(err, token))
        jwt.sign(payload, config.get('jwtSecret'), 
        {expiresIn: 360000}
        , (err, token)=>{
            if (err) throw err
            res.json({token})
        } )
        
    } catch (err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router