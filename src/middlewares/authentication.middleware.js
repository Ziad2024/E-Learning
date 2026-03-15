import { createUnauthorizedError } from "../utils/APIErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.utils.js";


export const authentication = asyncHandler( async (  req , res , next ) =>{

    let token = req.headers.authorization?.split("Bearer ")[1]

    if (!token) {
        token = req.cookies?.accessToken
        
        
    }

    if (!token) {
        throw createUnauthorizedError( "no token provided" )
    }


    const decoded = verifyToken(token)

    req.user = decoded
    
    next()


}  ) 