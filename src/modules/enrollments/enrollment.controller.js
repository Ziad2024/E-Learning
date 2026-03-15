import * as EnrollmentService from "./services/enrollment.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createResponse, successResponse } from "../../utils/APIResponse.js";

export const createEnrollment = asyncHandler(async (req, res) => {
    const enrollment = await EnrollmentService.createEnrollment(
        req.user.userId,
        req.body.course
    );

    res.status(201).json(
        createResponse(enrollment, "Enrolled successfully")
    );
});

export const getEnrollments = asyncHandler(async (req, res) => {
    const result = await EnrollmentService.getEnrollments(
        req.query,
        req.user.userId,
        req.user.role
    );

    res.json(
        successResponse(
            { enrollments: result.enrollments, pagination: result.pagination },
            "Enrollments retrieved successfully"
        )
    );
});

export const deleteEnrollment = asyncHandler(async (req, res) => {
    const result = await EnrollmentService.deleteEnrollment(
        req.params.id,
        req.user.userId,
        req.user.role
    );

    res.json(successResponse(result, "Enrollment cancelled successfully"));
});
