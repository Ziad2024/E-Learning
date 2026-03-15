import Enrollment from "../../../DB/models/enrollment.model.js";
import Course from "../../../DB/models/course.model.js";
import {
    createNotFoundError,
    createConflictError,
    createForbiddenError,
} from "../../../utils/APIErrors.js";
import { config } from "../../../config/env.js";

export const createEnrollment = async (userId, courseId) => {
    const course = await Course.findById(courseId);

    if (!course || !course.isActive) {
        throw createNotFoundError("Course not found");
    }

    if (course.status !== "published") {
        throw createForbiddenError("Cannot enroll in an unpublished course");
    }

    const existing = await Enrollment.findOne({
        student: userId,
        course: courseId,
    });

    if (existing) {
        throw createConflictError("You are already enrolled in this course");
    }

    const enrollment = await Enrollment.create({
        student: userId,
        course: courseId,
    });

    course.studentsEnrolled = (course.studentsEnrolled || 0) + 1;
    await course.save();

    return enrollment;
};

export const getEnrollments = async (query, userId, userRole) => {
    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.min(
        Math.max(parseInt(query.limit) || config.PAGINATION.DEFAULT_PAGE_SIZE, 1),
        config.PAGINATION.MAX_PAGE_SIZE
    );
    const skip = (page - 1) * limit;

    const filter = {};

    if (userRole === "admin") {
        if (query.student) filter.student = query.student;
        if (query.course) filter.course = query.course;
    } else {
        filter.student = userId;
    }

    if (query.status) filter.status = query.status;

    const [enrollments, total] = await Promise.all([
        Enrollment.find(filter)
            .populate("student", "firstName lastName email")
            .populate("course", "title slug price level")
            .skip(skip)
            .limit(limit)
            .sort({ enrolledAt: -1 }),
        Enrollment.countDocuments(filter),
    ]);

    return {
        enrollments,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const deleteEnrollment = async (enrollmentId, userId, userRole) => {
    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
        throw createNotFoundError("Enrollment not found");
    }

    if (
        userRole !== "admin" &&
        enrollment.student.toString() !== userId
    ) {
        throw createForbiddenError("You can only cancel your own enrollment");
    }

    const course = await Course.findById(enrollment.course);
    if (course) {
        course.studentsEnrolled = Math.max(
            (course.studentsEnrolled || 1) - 1,
            0
        );
        await course.save();
    }

    await enrollment.deleteOne();

    return { message: "Enrollment cancelled successfully" };
};
