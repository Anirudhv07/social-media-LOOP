import cors from 'cors'
import { Application } from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'



const expressConfig = (app:Application)=>{
    app.use(cors({
        credentials:true
    }))

    app.use(compression())
    app.use(cookieParser())
    app.use(bodyParser.json())

}

export default expressConfig