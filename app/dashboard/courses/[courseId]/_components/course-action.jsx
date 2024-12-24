
"use client";

import { changeCoursePublishState, deleteCourse } from "@/app/actions/course";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { toast } from "sonner";

export const CourseActions = ({ courseId, isActive }) => {
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(isActive);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      switch (action) {
        case "change-active":
          const activeState = await changeCoursePublishState(courseId);
          setPublished(!activeState);
          toast.success("The Course has been updated successfully.");
          router.refresh()
          break;
        case "delete":
          if (published) {
            toast.error(
              "A published course can not be deleted. First unpublish it, then you can delete it.",
            );
          } else {
            await deleteCourse(courseId);
            toast.success("The Course has been deleted successfully.");
            router.push(`/dashboard/courses`);
          }
          break;
        default:
          throw new Error("Invalid Course Active");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center gap-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setAction("change-active")}>
          {published ? "Unpublish" : "Publish"}
        </Button>

        <Button size='sm' onClick={() => setAction("delete")}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
    </form>
  );
};
