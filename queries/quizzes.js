import { replaceMongoIdInArray } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";


export async function getAllQuizSets() {
  try {
    const quizSets = await Quizset.find().populate({
      path: "quizIds",
      model: Quiz
    }).lean();    
    return replaceMongoIdInArray(quizSets);
  } catch (e) {
    throw new Error(e);
  }
}