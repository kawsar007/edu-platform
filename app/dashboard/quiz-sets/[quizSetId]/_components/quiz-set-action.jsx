"use client";

import { changeQuizPublishState } from "@/app/actions/quizSet";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const QuizSetAction = ({ quizSetId, isActive }) => {
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(isActive);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      switch (action) {
        case "change-active":
          const activeState = await changeQuizPublishState(quizSetId);
          setPublished(!activeState);
          toast.success("The Course has been updated successfully.");
          router.refresh();
          break;
        default:
          throw new Error("Invalid Quiz Active");
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

        <Button size='sm'>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
    </form>
  );
};
