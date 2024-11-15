import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
  const courses = await Course.find({}).select(["title", "thumbnail", "modules", "price", "category", "instructor"]).populate({
    path: "category",
    model: Category
  }).populate({
    path: "instructor",
    model: User
  }).populate({
    path: "testimonials",
    model: Testimonial
  }).populate({
    path: "modules",
    model: Module
  }).lean();
  return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category
    }).populate({
      path: "instructor",
      model: User
    }).populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User
      }
    }).populate({
      path: "modules",
      model: Module
    }).lean();
  return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId) {
  const courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  )

  // Object.groupBy method is not available in your current JavaScript environment.
  // const groupByCourses = Object.groupBy(enrollments.flat(), ({ course }) => course);

  // Custom function to group items by a specified key
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const groupByCourses = groupBy(enrollments.flat(), 'course');

  const totalRevenue = courses.reduce((acc, course) => {
    return (acc + groupByCourses[course._id].length * course.price)
  }, 0);

  const totalEnrollments = enrollments.reduce(function (acc, obj) {
    return acc + obj.length;
  }, 0)

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();
  const avgRating = (totalTestimonials.reduce((acc, item) => acc + item.rating, 0) / totalTestimonials.length).toFixed(2);


  return {
    "courses": courses.length,
    "enrollments": totalEnrollments,
    "reviews": totalTestimonials.length,
    "ratings": avgRating,
    "revenue": totalRevenue
  }
}