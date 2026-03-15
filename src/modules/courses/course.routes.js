import express from "express";
import * as CourseController from "./course.controller.js";
import * as courseValidation from "./validation/course.validation.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { ValidationRequest } from "../../middlewares/validation.middleware.js";

const courseRouter = express.Router();

courseRouter.post(
    "/",
    authentication,
    authorization("admin", "instructor"),
    ValidationRequest(courseValidation.createCourseValidation),
    CourseController.createCourse
);

courseRouter.get("/", CourseController.getAllCourses);

courseRouter.get(
    "/:id",
    ValidationRequest(courseValidation.getCourseByIdValidation),
    CourseController.getCourseById
);

courseRouter.put(
    "/:id",
    authentication,
    authorization("admin", "instructor"),
    ValidationRequest(courseValidation.updateCourseValidation),
    CourseController.updateCourse
);

courseRouter.delete(
    "/:id",
    authentication,
    authorization("admin", "instructor"),
    ValidationRequest(courseValidation.deleteCourseValidation),
    CourseController.deleteCourse
);

export default courseRouter;
