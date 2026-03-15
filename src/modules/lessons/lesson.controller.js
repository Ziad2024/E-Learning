import * as LessonService from "./services/lesson.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createResponse, successResponse } from "../../utils/APIResponse.js";

export const createLesson = asyncHandler(async (req, res) => {
    const lesson = await LessonService.createLesson(req.body, req.user);

    res.status(201).json(createResponse(lesson, "Lesson created successfully"));
});

export const getAllLessons = asyncHandler(async (req, res) => {
    const result = await LessonService.getAllLessons(req.query);

    res.json(
        successResponse(
            { lessons: result.lessons, pagination: result.pagination },
            "Lessons retrieved successfully"
        )
    );
});

export const getLessonById = asyncHandler(async (req, res) => {
    const lesson = await LessonService.getLessonById(req.params.id);

    res.json(successResponse(lesson, "Lesson retrieved successfully"));
});

export const updateLesson = asyncHandler(async (req, res) => {
    const lesson = await LessonService.updateLesson(
        req.params.id,
        req.body,
        req.user
    );

    res.json(successResponse(lesson, "Lesson updated successfully"));
});

export const deleteLesson = asyncHandler(async (req, res) => {
    const result = await LessonService.deleteLesson(req.params.id, req.user);

    res.json(successResponse(result, "Lesson deleted successfully"));
});
