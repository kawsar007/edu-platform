import { formatMyDate } from "@/lib/date";
import Image from "next/image";

const CourseDetails = ({ course }) => {
  console.log("course", course);
  
  const lastModifiedDate = formatMyDate(course?.modifiedOn)

  return (
    <section className='py-8 md:py-12 lg:py-24'>
      <div className='container'>
        <span className='bg-success py-0.5 px-0.5 rounded-full text-xs font-medium inline-block text-white'>
          {course?.category?.title}
        </span>
        <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold 2xl:text-5xl mt-3'>
          {course?.title}
        </h3>
        <p className='mt-3 text-gray-600 text-sm'>{course?.subtitle}</p>
        <div className='flex sm:items-center gap-5 flex-col sm:flex-row sm:gap-6 md:gap-20 mt-6'>
          <div className='flex items-center gap-2'>
            <Image
              className='w-[40px] h-[40px] rounded-full'
              src={course?.instructor?.profilePicture}
              alt={course?.instructor?.firstName}
              width={20}
              height={20}
            />
            <p className='font-bold'>
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-success font-semibold'>Last Updated: </span>
            <span>{lastModifiedDate}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
