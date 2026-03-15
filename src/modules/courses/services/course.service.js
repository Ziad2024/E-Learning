import Course from "../../../DB/models/course.model.js";
import Lesson from "../../../DB/models/lesson.model.js";
import Enrollment from "../../../DB/models/enrollment.model.js";
import { createNotFoundError, createForbiddenError } from "../../../utils/APIErrors.js";
import { config } from "../../../config/env.js";

export const createCourse = async (courseData, userId) => {
    const course = await Course.create({
        ...courseData,
        instructor: userId,
    });

    return course;
};

export const getAllCourses = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(
        Math.max(parseInt(query.limit) || config.PAGINATION.DEFAULT_PAGE_SIZE, 1),
        config.PAGINATION.MAX_PAGE_SIZE
    );
    const skip = (page - 1) * limit;

    const filter = { isActive: true };

    if (query.level) filter.level = query.level;
    if (query.status) filter.status = query.status;
    if (query.instructor) filter.instructor = query.instructor;

    const [courses, total] = await Promise.all([
        Course.find(filter)
            .populate("instructor", "firstName lastName email")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Course.countDocuments(filter),
    ]);

    return {
        courses,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getCourseById = async (courseId) => {
    const course = await Course.findById(courseId).populate(
        "instructor",
        "firstName lastName email"
    );

    if (!course || !course.isActive) {
        throw createNotFoundError("Course not found");
    }

    return course;
};

export const updateCourse = async (courseId, updateData, user) => {
    const course = await Course.findById(courseId);

    if (!course || !course.isActive) {
        throw createNotFoundError("Course not found");
    }

    if (
        user.role !== "admin" &&
        course.instructor.toString() !== user.userId
    ) {
        throw createForbiddenError("You can only update your own courses");
    }

    delete updateData.instructor;

    Object.assign(course, updateData);
    await course.save();

    return course;
};

export const deleteCourse = async (courseId, user) => {
    const course = await Course.findById(courseId);

    if (!course || !course.isActive) {
        throw createNotFoundError("Course not found");
    }

    if (
        user.role !== "admin" &&
        course.instructor.toString() !== user.userId
    ) {
        throw createForbiddenError("You can only delete your own courses");
    }

    course.isActive = false;
    await course.save();

    await Lesson.updateMany({ course: courseId }, { isPublished: false });
    await Enrollment.updateMany(
        { course: courseId, status: "active" },
        { status: "cancelled" }
    );

    return { message: "Course deleted successfully" };
};
