import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";


export async function getAllQuizSets() {
  try {
    const quizSets = await Quizset.find().lean();
    return replaceMongoIdInArray(quizSets);
  } catch (e) {
    throw new Error(e);
  }
}

export async function getQuizSetById(id) {
  try {
    const quizSet = await Quizset.findById(id).populate({
      path: "quizIds",
      model: Quiz
    }).lean();
    return replaceMongoIdInObject(quizSet);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createQuiz(quizData) {
  try {
    const quiz = await Quiz.create(quizData);
    return quiz._id.toString();
  } catch (error) {
    throw new Error(error);
  }
}