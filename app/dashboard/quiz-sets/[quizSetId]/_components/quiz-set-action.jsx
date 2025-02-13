"use client";

import { changeQuizPublishState, deleteQuizset } from "@/app/actions/quizSet";
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
        case "delete":
          if (published) {
            toast.error(
              "A published quiz set can't be deleted. First unpublish it, then you can delete it.",
            );
          } else {
            await deleteQuizset(quizSetId);
            toast.success("The quiz set has been deleted successfully.");
            router.push(`/dashboard/quiz-sets`);
          }
          break;
        default:
          throw new Error("Invalid Quiz Set Active");
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
