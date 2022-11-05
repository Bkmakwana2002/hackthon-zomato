const generateToken = require('../generateToken')
const User = require('../models/User')

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password, appeal } = req.body

        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).send({ success: false, message: 'User already exists' })
        }

        user = await User.create({
            name,
            email,
            password,
            appeal
        })

        if(res.status(201)){
            res.send({
                success:true,
                _id: user._id,
                name: user.name,
                email: user.email,
                appeal : user.appeal
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')

        if (user && (await user.matchPassword(password))) {
            let token =  generateToken(user._id)
            res.status(201).send({
                success: true,
                _id: user._id,
                email: user.email,
                appeal: user.appeal,
                token: token,
            });
        }else{
            res.status(401);
            throw new Error("Wrong Email or Password");
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}