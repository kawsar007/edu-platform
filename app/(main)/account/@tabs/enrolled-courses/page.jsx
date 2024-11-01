//import { CourseProgress } from "@/components/course-progress";
import EnrolledCourseCard from "../../component/enrolled-coursecard";

function EnrolledCourses() {
  return (
    <div className='grid sm:grid-cols-2 gap-6'>
      <EnrolledCourseCard />
    </div>
  );
}

export default EnrolledCourses;
