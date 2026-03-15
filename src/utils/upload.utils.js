
import cloudinary from './../config/cloudinary.js';
import { createBadRequestError } from './APIErrors.js';


export const uploadToCloudinary = async (file, folder = 'e-learning') => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type: 'auto',
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      type: result.resource_type,
      size: result.bytes,
    };
  } catch (error) {
    throw createBadRequestError('Failed to upload file');
  }
};


export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    return false;
  }
};