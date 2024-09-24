import { getCourseDetails } from "@/queries/courses";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";

const SingleCoursesPage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);

  console.log("Courses", course);

  return (
    <>
      <CourseDetailsIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />
    </>
  );
};
export default SingleCoursesPage;
