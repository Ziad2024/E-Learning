import User from "../../../DB/models/user.model.js";
import { createBadRequestError, createNotFoundError } from "../../../utils/APIErrors.js";
import { config } from "../../../config/env.js";

export const getAllUsers = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(
        Math.max(parseInt(query.limit) || config.PAGINATION.DEFAULT_PAGE_SIZE, 1),
        config.PAGINATION.MAX_PAGE_SIZE
    );
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    if (query.role) {
        filter.role = query.role;
    }

    const [users, total] = await Promise.all([
        User.find(filter)
            .select("-password -refreshToken -resetPasswordToken -resetPasswordExpires")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        User.countDocuments(filter),
    ]);

    return {
        users,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select(
        "-password -refreshToken -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
        throw createNotFoundError("User not found");
    }

    return user;
};

export const updateUserRole = async (userId, role) => {
    const validRoles = ["student", "instructor", "admin"];
    if (!validRoles.includes(role)) {
        throw createBadRequestError(`Invalid role. Must be one of: ${validRoles.join(", ")}`);
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
    ).select("-password -refreshToken -resetPasswordToken -resetPasswordExpires");

    if (!user) {
        throw createNotFoundError("User not found");
    }

    return user;
};

export const deleteUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw createNotFoundError("User not found");
    }

    if (user.role === "admin") {
        throw createBadRequestError("Cannot delete an admin user");
    }

    user.isActive = false;
    user.refreshToken = [];
    await user.save();

    return { message: "User has been deactivated" };
};
