import { auth } from "@/auth";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import { getUserByEmail, getUserDetails } from "@/queries/users";

export const COURSE_DATA = "course";
export const ENROLLMENT_DATA = "enrollment";
export const REVIEW_DATA = "review";

const populateReviewData = async (reviews) => {
  const populatedReview = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user?._id);      
      review["studentName"] = `${student?.first_name} ${student?.last_name}`;
      return review;
    })
  );

  return populatedReview;
};

export async function getInstructorDashboardData(dataType) {
  try {
    const session = await auth();
    const instructor = await getUserByEmail(session.user.email);
    const data = await getCourseDetailsByInstructor(instructor?.id, true);    

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case ENROLLMENT_DATA:
        return data?.enrollments;
      case REVIEW_DATA:
        return populateReviewData(data?.reviews);

      default:
        return data;
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
}