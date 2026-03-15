import mongoose from "mongoose"
import { config } from "../config/env.js";



const DateBase = async (  ) =>{
    try {

        const connection = await mongoose.connect(
            `${ config.DB_MONGO_ATLAS || config.MONGODB_URI }` 
        )


        if (connection) {
            console.log( "DB is connected"  );
            
        }else if ( error ) {

            console.log( "DB is failed" , error  );
            
        }

        
    } catch (error) {
        console.log( error );
    }


}


export default DateBase  