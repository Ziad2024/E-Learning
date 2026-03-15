import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Application
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  APP_NAME: process.env.APP_NAME || 'E-Learning Platform',

  // Database
  MONGODB_URI: process.env.MONGODB_URI,
  DB_MONGO_ATLAS: process.env.DB_MONGO_ATLAS,

  // JWT
  JWT: {
    SECRET: process.env.JWT_SECRET,
    ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE || '15m',
    REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
    RESET_PASSWORD_EXPIRE: process.env.JWT_RESET_PASSWORD_EXPIRE || '10m',
  },

  // Cookies
  COOKIE: {
    EXPIRE: parseInt(process.env.COOKIE_EXPIRE) || 7,
    HTTP_ONLY: process.env.COOKIE_HTTP_ONLY === 'true',
    SECURE: process.env.COOKIE_SECURE === 'true',
    SAME_SITE: process.env.COOKIE_SAME_SITE || 'lax',
  },

  // Email
  EMAIL: {
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
    SECURE: process.env.EMAIL_SECURE === 'true',
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
    FROM: process.env.EMAIL_FROM,
  },

  // Cloudinary
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },

  // File Upload
  UPLOAD: {
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5242880,
    MAX_VIDEO_SIZE: parseInt(process.env.MAX_VIDEO_SIZE) || 104857600,
    ALLOWED_IMAGE_TYPES: process.env.ALLOWED_IMAGE_TYPES?.split(',') || ['jpg', 'jpeg', 'png'],
    ALLOWED_VIDEO_TYPES: process.env.ALLOWED_VIDEO_TYPES?.split(',') || ['mp4', 'webm'],
    ALLOWED_DOCUMENT_TYPES: process.env.ALLOWED_DOCUMENT_TYPES?.split(',') || ['pdf'],
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 2,
  },

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
    MAX_PAGE_SIZE: parseInt(process.env.MAX_PAGE_SIZE) || 100,
  },

  // Development flags
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};