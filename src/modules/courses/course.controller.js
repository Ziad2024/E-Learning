import * as CourseService from "./services/course.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createResponse, successResponse } from "../../utils/APIResponse.js";

export const createCourse = asyncHandler(async (req, res) => {
    const course = await CourseService.createCourse(req.body, req.user.userId);

    res.status(201).json(createResponse(course, "Course created successfully"));
});

export const getAllCourses = asyncHandler(async (req, res) => {
    const result = await CourseService.getAllCourses(req.query);

    res.json(
        successResponse(
            { courses: result.courses, pagination: result.pagination },
            "Courses retrieved successfully"
        )
    );
});

export const getCourseById = asyncHandler(async (req, res) => {
    const course = await CourseService.getCourseById(req.params.id);

    res.json(successResponse(course, "Course retrieved successfully"));
});

export const updateCourse = asyncHandler(async (req, res) => {
    const course = await CourseService.updateCourse(
        req.params.id,
        req.body,
        req.user
    );

    res.json(successResponse(course, "Course updated successfully"));
});

export const deleteCourse = asyncHandler(async (req, res) => {
    const result = await CourseService.deleteCourse(req.params.id, req.user);

    res.json(successResponse(result, "Course deleted successfully"));
});
