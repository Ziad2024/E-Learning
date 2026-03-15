import { createForbiddenError } from "../utils/APIErrors.js"
import { asyncHandler } from "../utils/asyncHandler.js"



export const authorization = ( ...roles ) =>{
    
    return asyncHandler(  async (req , res , next ) =>{
        if (!req.user) {
            throw createForbiddenError( "user info in not found" )
        }

        if ( !roles.includes( req.user.role ) ) {
            throw createForbiddenError( ` only ${ roles.join( ", ") }  can access this api  ` )
        }

        next()
    } ) 
} 