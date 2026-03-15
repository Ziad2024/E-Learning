import mongoose from 'mongoose';
import slugify from 'slugify';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thumbnail: {
      url: String,
      publicId: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'all_levels'],
      default: 'beginner',
    },
    duration: {
      type: Number, // in hours
      default: 0,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lessonsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Generate slug
courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);
export default Course;