import express from "express";
import * as AdminController from "./admin.controller.js";
import * as adminValidation from "./validation/admin.validation.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { authorization } from "../../middlewares/authorization.middleware.js";
import { ValidationRequest } from "../../middlewares/validation.middleware.js";

const adminRouter = express.Router();

adminRouter.use(authentication, authorization("admin"));

adminRouter.get(
    "/users",
    ValidationRequest(adminValidation.getAllUsersValidation),
    AdminController.getAllUsers
);

adminRouter.get(
    "/users/:id",
    ValidationRequest(adminValidation.getUserByIdValidation),
    AdminController.getUserById
);

adminRouter.put(
    "/users/:id/role",
    ValidationRequest(adminValidation.updateUserRoleValidation),
    AdminController.updateUserRole
);

adminRouter.delete(
    "/users/:id",
    ValidationRequest(adminValidation.deleteUserValidation),
    AdminController.deleteUser
);

export default adminRouter;
