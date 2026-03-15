
import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema( 
    {
        firstName : {
            type : String ,
            required : true ,
            trim :true 
        },

        lastName : {
            type : String ,
            required : true ,
            trim : true 
        },

        email : {
            type : String , 
            required :true ,
            unique : true ,
            lowercase : true ,
            trim : true
        },
        password : {
            type :String ,
            required : true ,
            select : false 
        },
        avatar : {
            url : String ,
            PublicId : String
        },
        role : {
            type : String ,
            enum : [ "student" , "instructor" , "admin" ] ,
            default : "student"
        },

        bio : {
            type : String ,
            maxlength : 500 
        },
        phone : String ,
        isActive : {
            type : Boolean ,
            default : true
        },
        refreshToken :[
            {
                token : String ,
                expireAt : Date
            },
        ],
        resetPasswordToken : String ,
        resetPasswordExpires : Date ,
        lastLogin :Date


     },
     {timestamps :true}
 )

     // Virtual for full name
    userSchema.virtual('fullName').get(function () {
      return `${this.firstName}${this.lastName}`;
    });

 const User = mongoose.model.User || mongoose.model( "User" , userSchema  )

 export default User 