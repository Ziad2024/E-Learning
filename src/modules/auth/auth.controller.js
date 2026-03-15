import * as AuthService from "./services/auth.service.js"
import { asyncHandler } from './../../utils/asyncHandler.js';
import { createResponse, successResponse } from "../../utils/APIResponse.js";


export const register = asyncHandler( async ( req , res ) =>{

    const user = await AuthService.registerUser(req.body )

    res.status(201).json(  createResponse(user , "User has been created" )  )

})



export const  login = asyncHandler(  async ( req , res ) =>{

   const {user ,tokens }  = await AuthService.loginUser( req.body.email , req.body.password )


   res.json( successResponse( {
    user ,
    tokens
   } ) )

} )


export const  refreshToken = asyncHandler(  async ( req , res ) =>{

    const refreshToken = req.headers.refreshtoken || req.cookies.refreshtoken


    if (!refreshToken) {
        throw new Error( "refresh token is required" )
    }

    const token = await AuthService.refreshAccessToken( refreshToken )

   res.json( successResponse( {
    
    accessToken : token, 
     message : "token refreshed success"
   } ) )

} )

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await AuthService.forgotPassword(req.body.email);

  res.json(
    successResponse(result, 'Password reset email sent if email exists')
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  console.log( req.body.password );
  const user = await AuthService.resetPassword(req.params.token, req.body.password);
  
  

  res.json(
    successResponse(user, 'Password reset successfully')
  );
});



export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.headers.refreshtoken || req.cookies.refreshtoken;

  await AuthService.logoutUser(req.user.userId, refreshToken);

  res.clearCookie('accessToken');
  res.clearCookie('refreshtoken');

  res.json(
    successResponse(null, 'Logout successful')
  );
});
