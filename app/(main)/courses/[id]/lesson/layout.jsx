import { CourseSidebar } from "./_components/course-sidebar";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";

const CourseLayout = ({ children }) => {
  return (
    <div className=''>
      <div className='h-[80px] lg:pl-96 fixed top-[60px] inset-y-0 w-full z-10'>
        <div className='p-4 lg:hidden border-b h-full flex items-center bg-white shadow-sm relative'>
          {/* Course Sidebar For Mobile */}
          <CourseSidebarMobile />
          {/* <NavbarRoutes /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className='hidden lg:flex h-full w-96 flex-col inset-y-0 z-50'>
          <CourseSidebar />
        </div>
        <main className='lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4'>{children}</main>
      </div>
    </div>
  );
};
export default CourseLayout;
