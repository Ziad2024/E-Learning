import authRouter from "../modules/auth/auth.routes.js"
import userRouter from "../modules/users/user.routes.js"
import adminRouter from "../modules/admin/admin.routes.js"
import courseRouter from "../modules/courses/course.routes.js"
import lessonRouter from "../modules/lessons/lesson.routes.js"
import enrollmentRouter from "../modules/enrollments/enrollment.routes.js"

const routerHandler = async ( app , express ) => {

    app.use( express.json( ) )
    app.use("/auth" , authRouter )
    app.use("/users" , userRouter  )
    app.use("/admin" , adminRouter )
    app.use("/courses" , courseRouter )
    app.use("/lessons" , lessonRouter )
    app.use("/enrollments" , enrollmentRouter )

}


export default routerHandler