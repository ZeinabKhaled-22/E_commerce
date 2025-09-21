import bcrypt from 'bcrypt'
import { Cart, User } from "../../../db/index.js"
import { AppError } from "../../utlis/appError.js"
import { messages } from "../../utlis/constant/messages.js"
import { sendEmail } from '../../utlis/email.js'
import { generateToken, verifyToken } from '../../utlis/token.js'
import { status } from '../../utlis/constant/enums.js'

// signup
export const signup = async (req,res,next) => {
    // get data from req
    let { name, email, password, phone } = req.body
    // check existence
    const userExist = await User.findOne({ $or: [{email}, {phone}] }) //{}, null
    if(userExist){
        return next(new AppError(messages.user.alreadyExist, 409))
    }
    // prepare data
    password = bcrypt.hashSync(password, 8)
    const user = new User({
        name,
        email,
        password,
        phone
    })
    // add to db
    const createdUser = await user.save() //{}, null
    if(!createdUser){
        return next(new AppError(messages.user.failToCreate, 500))
    }
    // generate token
    const token = generateToken({ payload: { email, _id: createdUser._id } })
    // send email
   await sendEmail({
        to: email,
        subject: 'verify your account',
        html: `<p>click on link to verify account <a herf="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a></p>`
    })
    // send response
    return res.status(201).json({
        message: messages.user.createdSuccessfully,
        success: true,
        data: createdUser
    })
}

// verify token
export const verifyAccount = async(req,res,next) => {
    // get data from req
    const { token } = req.params
    const payload = verifyToken({ token })
    await User.findOneAndUpdate({ email: payload.email, status: status.PENDING}, {status: status.VERIFIED})
    await Cart.create({ user: payload._id, products: []})
    return res.status(200).json({message: messages.user.verified, success: true})
}

// login
export const login = async (req,res,next) => {
    // get data from req
    const { email, phone, password } = req.body
    // check existence
    const userExist = await User.findOne({ $or: [{ email }, { phone }], status: status.VERIFIED }) // {}, null
    if(!userExist){
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // compare password
    const match = bcrypt.compareSync(password, userExist.password)
    if(!match){
        return next(new AppError(messages.user.invalidCredentials, 400))
    }
    // generate token
    const token = generateToken({ payload: {_id: userExist._id, email} })
    // send response
    return res.status(200).json({
        message: 'login successfully',
        success: true,
        token
    })
}

// update account
export const updateAccount = async (req,res,next) => {
    // get data from req
    const {name, email, password, phone } = req.body
    const{ userId } = req.params
    // check existence
    const userExist = await User.findById(userId)//{}, null
    if(!userExist){
        return next(new AppError(messages.user.notFound, 404))
    }
    // prepare data
    userExist.name = name
    userExist.email = email
    userExist.phone = phone
    userExist.password = password
    // add to db
    const updatedUser = await userExist.save()//{}, null
    if(!updatedUser){
        return next(new AppError(messages.user.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message: messages.user.updatedSuccessfully,
        success: true,
        data: updatedUser
    })
}

// delete account
export const deleteAccount = async (req,res,next) => {
    // get data from req
    const { userId } = req.params
    const deletedUser = await User.deleteOne({ _id: userId})
    return res.status(200).json({message: messages.user.deletedSuccessfully})
}
