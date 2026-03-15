import express from "express";
import * as LessonController from "./lesson.controller.js";
import * as lessonValidation from "./validation/lesson.validation.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { ValidationRequest } from "../../middlewares/validation.middleware.js";

const lessonRouter = express.Router();

lessonRouter.post(
    "/",
    authentication,
    authorization("admin", "instructor"),
    ValidationRequest(lessonValidation.createLessonValidation),
    LessonController.createLesson
);

lessonRouter.get("/", LessonController.getAllLessons);

lessonRouter.get(
    "/:id",
    ValidationRequest(lessonValidation.getLessonByIdValidation),
    LessonController.getLessonById
);

lessonRouter.put(
    "/:id",
    authentication,
    authorization("admin", "instructor"),
    ValidationRequest(lessonValidation.updateLessonValidation),
    LessonController.updateLesson
);

lessonRouter.delete(
    "/:id",
    authentication,
    authorization("admin", "instructor"),
    ValidationRequest(lessonValidation.deleteLessonValidation),
    LessonController.deleteLesson
);

export default lessonRouter;
