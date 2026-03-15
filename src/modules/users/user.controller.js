import * as UserService from './services/user.service.js';
import { successResponse } from '../../utils/APIResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await UserService.getProfile(req.user.userId);

  res.json(successResponse(user, 'Profile retrieved successfully'));
});


export const UpdateProfile = asyncHandler(async (req, res) => {
  const user = await UserService.updateProfile(req.user.userId , req.body );

  res.json(successResponse(user, 'Profile updated successfully'));
});


export const changePassword = asyncHandler(async (req, res) => {
  const user = await UserService.changePassword(
    req.user.userId ,
    req.body.newPassword  ,
    req.body.currentPassword

  );

  res.json(successResponse(user, 'password has been changed successfully'));
});


export const uploadAvatar = asyncHandler(async (req, res) => {
  const user = await UserService.uploadAvatar(req.user.userId, req.file);

  res.json(successResponse(user, 'Avatar uploaded successfully'));
});



export const getAllUsers = asyncHandler(async (req, res) => {

  const result = await UserService.getAllUsers()

  res.json(
    successResponse(result.users, 'Users retrieved successfully', result.pagination)
  );
});

