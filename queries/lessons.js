import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.modal";


export async function getLesson(lessonId) {
  const lesson = await Lesson.findById(lessonId).lean();
  return replaceMongoIdInObject(lesson);
};

export async function create(lessonData) {
  try {
    const lesson = await Lesson.create(lessonData);
    return lesson?._id.toString();
  } catch (err) {
    throw new Error(err)
  }
}
