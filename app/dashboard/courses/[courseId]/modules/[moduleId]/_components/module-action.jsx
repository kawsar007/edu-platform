"use client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { changeModulePublishState, deleteModule } from "@/app/actions/module";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const ModuleActions = ({ singleModule, courseId }) => {
  const router = useRouter();
  const [action, setAction] = useState(null);
  const [published, setPublished] = useState(singleModule?.active);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      switch (action) {
        case "change-active":
          const activeState = await changeModulePublishState(singleModule.id);
          setPublished(!activeState);
          toast.success("The module has been updated successfully.");
          router.refresh();
          break;
        case "delete":
          if (published) {
            toast.error(
              "A published module can not be deleted. First unpublish it, then you can delete it.",
            );
            return;
          } else {
            await deleteModule(singleModule?.id, courseId);
            router.push(`/dashboard/courses/${courseId}`);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      throw new Error(err);
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
