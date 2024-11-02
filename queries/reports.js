import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Report } from "@/model/report-model";


export async function getAReport(filter) {
  try {
    const report = await Report.findOne(filter).populate({
      path: "quizAssessment",
      model: Assessment
    }).lean();
    
    // Check if report is null
    if (!report) {
      throw new Error("Report not found");
    }

    return replaceMongoIdInObject(report)
  } catch (error) {
    throw new Error(error);
  }
}