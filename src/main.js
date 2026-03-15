import express from "express"
import dotenv from "dotenv"
import DateBase from "./DB/connection.js"
import User from "./DB/models/user.model.js"
import routerHandler from "./utils/routerHandler.js"
import { verifyEmailTransporter } from "./utils/email.utils.js"
import { notFound } from "./middlewares/notFound.middleware.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { config } from "./config/env.js"
import { apiLimit } from "./middlewares/ratelimit.middleware.js"

dotenv.config()



const bootstrap = async () => {

    const app = express()

    // ======================== SEC 🔐

    app.use( helmet(   )  )
    app.use( cors( {
        origin : [config.FRONTEND_URL , "*" ] ,
        credentials : true
    } ) )
    
    // app.use( mongoSanitize() )
    
    // app.use(xss() )

    app.use( apiLimit )


    app.use( cookieParser() )

    // test prod
    
    //DB
    await DateBase()


    // Verify email transporter
    verifyEmailTransporter()

    // routers
    routerHandler( app , express )





    // 404 handler - must be before error handler
    app.use(notFound);
    

    // Global error handler - must be last
    app.use( errorHandler )

     const server = app.listen( process.env.PORT ,  ( error ) =>{

    console.log( `server is running ${ process.env.PORT }
         ${ JSON.stringify( server.address() ) }  ` );
        
    } )


}


export default bootstrap