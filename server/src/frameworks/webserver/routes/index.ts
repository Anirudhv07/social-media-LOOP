import { Application } from "express"
import authRouter from "./auth"
import userRouter from "./user"
import postRouter from "./post"


const routes=(app:Application)=>{

    app.use('/api/auth',authRouter())

    app.use('/api/user',userRouter())

    app.use('/api/post',postRouter())

}

export default routes