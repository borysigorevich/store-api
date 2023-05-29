const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const loginController = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    if (username && password) {
        if (req.session.user) {
            return res.status(200).json({msg: 'You are already logged in', user: req.session.user})
        } else {
            const user = await User.findOne({username}).exec()
            if (!user) return res.status(401).json({msg: 'Unauthorized'})

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) return res.status(400).json({msg: 'Invalid credentials'})

            req.session.user = user.user
            return res.status(201).json({user})
        }
    }

    return res.status(400).json({msg: 'Please provide username and password'})
})

const registerController = asyncHandler(async (req, res) => {
    let {username, password, email} = req.body

    if (username && password) {
        const user = await User.findOne({username}).exec()

        if (user) return res.status(400).json({msg: 'Username or password already exists'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({username, password: hashedPassword, email})

        const {password: hashedPwd, ...rest} = newUser._doc

        return res.status(201).json({user: rest})
    }

    return res.status(400).json({msg: 'Please provide username and password'})
})

module.exports = {
    loginController,
    registerController
}