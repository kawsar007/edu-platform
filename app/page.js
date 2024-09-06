import Test from "@/components/test";
import { getCourses } from "@/queries/courses";

export default async function Home() {
  const courses = await getCourses();
  console.log("My Courses", courses);
  
  return (
    <Test />
  );
}
