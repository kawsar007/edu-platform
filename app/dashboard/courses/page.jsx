import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

// const courses = [
//   {
//     id: 1,
//     title: "Reactive Accelerator",
//     price: 49,
//     isPublished: true,
//   },
//   {
//     id: 2,
//     title: "Think In A Redux Way",
//     price: 10,
//     isPublished: false,
//   },
// ];
const CoursesPage = async () => {
  const data = await getInstructorDashboardData();
  console.log("Course Data ---> ", data);
  
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data?.courses} />
    </div>
  );
};

export default CoursesPage;
