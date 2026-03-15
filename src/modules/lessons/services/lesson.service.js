import Lesson from "../../../DB/models/lesson.model.js";
import Course from "../../../DB/models/course.model.js";
import {
    createNotFoundError,
    createForbiddenError,
} from "../../../utils/APIErrors.js";
import { config } from "../../../config/env.js";

export const createLesson = async (lessonData, user) => {
    const course = await Course.findById(lessonData.course);

    if (!course || !course.isActive) {
        throw createNotFoundError("Course not found");
    }

    if (
        user.role !== "admin" &&
        course.instructor.toString() !== user.userId
    ) {
        throw createForbiddenError(
            "You can only add lessons to your own courses"
        );
    }

    const lesson = await Lesson.create(lessonData);

    course.lessonsCount = await Lesson.countDocuments({ course: course._id });
    await course.save();

    return lesson;
};

export const getAllLessons = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(
        Math.max(parseInt(query.limit) || config.PAGINATION.DEFAULT_PAGE_SIZE, 1),
        config.PAGINATION.MAX_PAGE_SIZE
    );
    const skip = (page - 1) * limit;

    const filter = {};

    if (query.course) filter.course = query.course;
    if (query.type) filter.type = query.type;
    if (query.isPublished !== undefined)
        filter.isPublished = query.isPublished === "true";

    const [lessons, total] = await Promise.all([
        Lesson.find(filter)
            .populate("course", "title slug")
            .skip(skip)
            .limit(limit)
            .sort({ order: 1, createdAt: -1 }),
        Lesson.countDocuments(filter),
    ]);

    return {
        lessons,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getLessonById = async (lessonId) => {
    const lesson = await Lesson.findById(lessonId).populate(
        "course",
        "title slug instructor"
    );

    if (!lesson) {
        throw createNotFoundError("Lesson not found");
    }

    return lesson;
};

export const updateLesson = async (lessonId, updateData, user) => {
    const lesson = await Lesson.findById(lessonId).populate(
        "course",
        "instructor"
    );

    if (!lesson) {
        throw createNotFoundError("Lesson not found");
    }

    if (
        user.role !== "admin" &&
        lesson.course.instructor.toString() !== user.userId
    ) {
        throw createForbiddenError("You can only update lessons in your own courses");
    }

    delete updateData.course;

    Object.assign(lesson, updateData);
    await lesson.save();

    return lesson;
};

export const deleteLesson = async (lessonId, user) => {
    const lesson = await Lesson.findById(lessonId).populate(
        "course",
        "instructor"
    );

    if (!lesson) {
        throw createNotFoundError("Lesson not found");
    }

    if (
        user.role !== "admin" &&
        lesson.course.instructor.toString() !== user.userId
    ) {
        throw createForbiddenError("You can only delete lessons in your own courses");
    }

    const courseId = lesson.course._id;
    await lesson.deleteOne();

    const count = await Lesson.countDocuments({ course: courseId });
    await Course.findByIdAndUpdate(courseId, { lessonsCount: count });

    return { message: "Lesson deleted successfully" };
};
