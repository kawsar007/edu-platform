"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const [action, setAction] = useState(null)
  const [published, setPublished] = useState(lesson?.active);

   const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Action", action);
    // try {
    //   await onDelete(lesson.id, moduleId);
    // } catch (error) {
    //   console.error("Error deleting lesson:", error);
    // }
  };
  return (
    <form onSubmit={handleSubmit}>
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={() => setAction("change-active")} >
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" onClick={() => setAction("delete")}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
    </form>
  );
};
