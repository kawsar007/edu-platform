import { getLoggedInUser } from "@/lib/loggedin-user";
import { hasEnrollmentsForCourse } from "@/queries/enrollments";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";

const CourseLayout = async ({ children, params: { id } }) => {
  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) {
    redirect("/login");
  }

  const isEnrolled = await hasEnrollmentsForCourse(id, loggedInUser.id);
  if(!isEnrolled) {
    redirect("/courses");
  };
  
  return (
    <div className=''>
      <div className='h-[80px] lg:pl-96 fixed top-[60px] inset-y-0 w-full z-10'>
        <div className='p-4 lg:hidden border-b h-full flex items-center bg-white shadow-sm relative'>
          {/* Course Sidebar For Mobile */}
          <CourseSidebarMobile courseId={id} />
          {/* <NavbarRoutes /> */}
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12'>
        <div className='hidden lg:flex h-full w-96 flex-col inset-y-0 z-50'>
          <CourseSidebar courseId={id} />
        </div>
        <main className='lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4'>
          {children}
        </main>
      </div>
    </div>
  );
};
export default CourseLayout;
