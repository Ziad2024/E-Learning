import express from "express";
import * as EnrollmentController from "./enrollment.controller.js";
import * as enrollmentValidation from "./validation/enrollment.validation.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { ValidationRequest } from "../../middlewares/validation.middleware.js";

const enrollmentRouter = express.Router();

enrollmentRouter.use(authentication);

enrollmentRouter.post(
    "/",
    ValidationRequest(enrollmentValidation.createEnrollmentValidation),
    EnrollmentController.createEnrollment
);

enrollmentRouter.get("/", EnrollmentController.getEnrollments);

enrollmentRouter.delete(
    "/:id",
    ValidationRequest(enrollmentValidation.deleteEnrollmentValidation),
    EnrollmentController.deleteEnrollment
);

export default enrollmentRouter;
