"use client";

import { Trash } from "lucide-react";

import { changeLessonPublishState, deleteLesson } from "@/app/actions/lessons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(lesson?.active);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (action) {
        case "change-active":
          const activeState = await changeLessonPublishState(lesson?.id);
          setPublished(!activeState);
          toast.success("The Lesson has been updated.");
          break;
        case "delete":
          if (published) {
            toast.error(
              "A published lesson can not be deleted. First unpublish it, then you can delete it.",
            );
          } else {
            await deleteLesson(lesson?.id, moduleId);
            onDelete(lesson?.id);
          }
          break;
        default:
          throw new Error("Invalid Lesson Active");
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
