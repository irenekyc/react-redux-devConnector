const express = require ('express')
const router = express.Router()
const gravatar = require('gravatar')
const { check, validationResult } = require('express-validator/check')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require ('../../models/User')
const config = require ('config')

//@route    POST api/users
//@desc     Register User
//@access   PUBLIC
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password at least 6 charactors').isLength({min: 6})
    ]
    , async (req, res)=>{
    const errors = validationResult(req);
//Check validation
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})}
    const {name, email, password} = req.body
    try {
        
    
        // see if the user exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors: [ { msg: 'User already exist'}]})
        }

        // get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User ({
            name,
            email,
            avatar,
            password
        })

        //Encrypt password
        //salt is the varaible for bcrpyt to encrypt
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

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