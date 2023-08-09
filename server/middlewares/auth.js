import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import ErrorHandler from '../utils/errorhandler.js'

export const isAuth = async(req,res,next) => {
    try {
        const {token} = req.cookies
        if(!token) {
            return next(new ErrorHandler("Please login first", 401))
        } 
    
        const decode =  jwt.verify(token, process.env.JWT_SERECT)
    
        req.user = await User.findById(decode._id)
        next()
    } catch (error) {
        return next(new ErrorHandler(error, 500))
    }
}