import express from 'express';
import * as UserController from './user.controller.js';
import { authentication } from  "../../middlewares/authentication.middleware.js";
import { authorization } from '../../middlewares/authorization.middleware.js';
import { uploadSingle } from '../../middlewares/upload.middleware.js';
const userRouter = express.Router();


userRouter.get('/profile' , authentication , authorization("student") ,  UserController.getProfile );

userRouter.put( "/profile"  , authentication , UserController.UpdateProfile )

userRouter.post( "/change-password" , authentication  , UserController.changePassword  )

userRouter.put('/profile/avatar',authentication 
   ,  uploadSingle("image")  ,UserController.uploadAvatar );

   

   
// Admin only routes
userRouter.get('/admin/all', authentication , authorization('admin'), UserController.getAllUsers);


export default userRouter;   

















