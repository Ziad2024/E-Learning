import * as AdminService from "./services/admin.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/APIResponse.js";

export const getAllUsers = asyncHandler(async (req, res) => {
    const result = await AdminService.getAllUsers(req.query);

    res.json(
        successResponse(
            { users: result.users, pagination: result.pagination },
            "Users retrieved successfully"
        )
    );
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await AdminService.getUserById(req.params.id);

    res.json(successResponse(user, "User retrieved successfully"));
});

export const updateUserRole = asyncHandler(async (req, res) => {
    const user = await AdminService.updateUserRole(req.params.id, req.body.role);

    res.json(successResponse(user, "User role updated successfully"));
});

export const deleteUser = asyncHandler(async (req, res) => {
    const result = await AdminService.deleteUser(req.params.id);

    res.json(successResponse(result, "User deleted successfully"));
});
