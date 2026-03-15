import User from "../../../DB/models/user.model.js"
import { createNotFoundError, createUnauthorizedError } from "../../../utils/APIErrors.js"
import { comparePassword, hashPassword } from "../../../utils/password.utils.js"
import { deleteFromCloudinary, uploadToCloudinary } from "../../../utils/upload.utils.js"





export const getProfile = async ( userId ) =>{

    const user = await User.findById( userId ).select( "-password  -refreshToken" )

    if (!user) {
        throw createNotFoundError( "user not found" )
    }

    return user
}



export const updateProfile =  async (userId , updatedDate ) =>{

    delete updatedDate.password 
    delete updatedDate.email 
    delete updatedDate.role 

    const user = await User.findByIdAndUpdate(  userId  , updatedDate ,{
        new : true
    }  ).select( " -password -refreshToken" )


    if (!user) {
        throw createNotFoundError("user not found")
    }

    return  user

} 




export const changePassword =  async ( userId ,  newPassword , currentPassword  ) =>{

    const user  =await User.findById( userId ).select( "+password")

   if (!user) {
        throw createNotFoundError("user not found")
    }

    const isPasswordExist = await comparePassword( currentPassword , user.password  ) 

       if (!isPasswordExist) {
        throw createUnauthorizedError("current password is incorrect")
    }

    user.password = await hashPassword( newPassword )
    user.refreshToken = []

    await user.save()

    user.password = undefined
    

    return user

} 


export const uploadAvatar = async ( userId  , file ) => {
    const user = await User.findById( userId ).select("-password")

       if (!user) {
        throw createNotFoundError("user not found")
    }

    if (user.avatar && user.avatar.PublicId ) {
        await deleteFromCloudinary( user.avatar.PublicId )
    }



    const result = await uploadToCloudinary( file , "e-learning/image"  ) 
    
    user.avatar = {
        url : result.url ,
        PublicId : result.publicId

    }

    await user.save()

    return user
};


export const getAllUsers = async () => {
    const users = await User.find({ isActive: true })
        .select("-password -refreshToken -resetPasswordToken -resetPasswordExpires")
        .sort({ createdAt: -1 });

    return { users, pagination: null };
};



