import { v2 as cloudinary } from "cloudinary"
import { config } from './env.js';




cloudinary.config( {
    cloud_name : config.CLOUDINARY.CLOUD_NAME || "dykihgk5b" ,
    api_key : config.CLOUDINARY.API_KEY|| 346285657516188 ,
    api_secret : config.CLOUDINARY.API_SECRET || "zsQdXfZBweHf3mMckzFbUf8IJAk" 
} )


export default cloudinary


