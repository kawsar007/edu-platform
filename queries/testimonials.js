import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonial-model";

export async function getTestimonialsForCourse(courseId) {
  const testimonoals = await Testimonial.find({ courseId: courseId}).lean();
  return replaceMongoIdInArray(testimonoals);
}