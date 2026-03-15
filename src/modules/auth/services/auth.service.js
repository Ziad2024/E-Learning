import User from "../../../DB/models/user.model.js"
import { createConflictError, createNotFoundError, createUnauthorizedError } from "../../../utils/APIErrors.js"
import { sendPasswordResetEmail, sendWelcomeEmail } from "../../../utils/email.utils.js"
import { encrypt } from "../../../utils/encrypt.js"
import { decodeToken, generateAccessToken, generateRefreshToken, generateResetToken, verifyToken } from "../../../utils/jwt.utils.js"
import { comparePassword, hashPassword } from "../../../utils/password.utils.js"


export const registerUser = async ( userData ) =>{

    const existUser =  await User.findOne( { email : userData.email } )
    if (existUser) {
        throw createConflictError("email is exist")      
    }


    const hash_Password = await hashPassword( userData.password )

    const user = await User.create( { ...userData 
        , password : hash_Password
     } )


     // send welcome email
     try {
     await sendWelcomeEmail(user)
     } catch (error) {
        console.log( error );
        
     }

    return user


}



export const loginUser = async ( email , password ) =>{

    const user = await User.findOne( { email } ).select( "+password" )

    if (!user) {
        throw createUnauthorizedError("invalid email or the password")     
    }

    const isPasswordValid = await comparePassword( password , user.password )
    if (!isPasswordValid) {
        throw  createUnauthorizedError("invalid email or the password") 
    }

    const access_token = generateAccessToken( {
        userId : user._id ,
        email : user.email ,
        role :user.role
    } )


    const refresh_token = generateRefreshToken( {
        userId : user._id ,
        email : user.email ,
        role :user.role
    } )

    user.refreshToken.push( {
        token : refresh_token ,
         expireAt : new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 )

    } )

    user.lastLogin = new Date()
    await user.save()
    
    user.password = undefined

    return  { user , tokens : { refresh_token  : refresh_token , access_token : access_token} }



}


export const refreshAccessToken = async( refreshToken ) =>{

    const decoded = verifyToken( refreshToken )

    const user = await User.findById( decoded.userId )

    if (!user) {
        throw createNotFoundError( "user not found" )
    }

    console.log(User );
    
    const ExistToken = user.refreshToken.some((rt) => rt.token === refreshToken && rt.expireAt > new Date())

     if (!ExistToken) {
        throw createUnauthorizedError( "invalid refresh token" )
    }


    const accessToken = generateAccessToken (
        {
            userId : user._id ,
            email:user.email ,
            role : user.role
        }
    )


    return accessToken

}

export const forgotPassword = async( email ) =>{

    const user = await User.findOne({ email})

    if (!user) {
        return { message : " if there is an email you will had message " }
    }

    const resetToken = generateResetToken({ userId : user._id })

    user.resetPasswordToken = encrypt( resetToken )

    user.resetPasswordExpires = new Date( Date.now() +60 * 60 * 60 * 1000  )
    await user.save()


    try {
        await sendPasswordResetEmail( user , resetToken )

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        throw error
    }

    return { message : "password reset link to email" }

}

export const logoutUser = async (userId, refreshToken) => {
    const user = await User.findById(userId);
    if (!user) {
        throw createNotFoundError("user not found");
    }

    if (refreshToken) {
        user.refreshToken = user.refreshToken.filter(
            (rt) => rt.token !== refreshToken
        );
    } else {
        user.refreshToken = [];
    }

    await user.save();
};

export const resetPassword = async( token , newPassword  ) =>{
    const decoded =  decodeToken(token )

    if ( !decoded || !decoded.userId ) {
        throw createUnauthorizedError( "invalid or expired reset token" )
    }

    const user = await User.findById(decoded.userId )


    if (   !user ||  !user.resetPasswordToken || user.resetPasswordExpires < new Date() ) {

        throw createUnauthorizedError( "invalid or expired reset token" )
    }

    const hashpassword = await  hashPassword(newPassword)
    user.password = hashpassword
    user.resetPasswordToken = undefined 
    user.resetPasswordExpires = undefined

    user.refreshToken = []
    await user.save() 


    return user

}



