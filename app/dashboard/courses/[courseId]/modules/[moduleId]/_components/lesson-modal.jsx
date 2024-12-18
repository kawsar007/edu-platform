import { IconBadge } from "@/components/icon-badge";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { CourseActions } from "../../../_components/course-action";
import { LessonAccessForm } from "./lesson-access-form";
import { LessonDescriptionForm } from "./lesson-description-form";
import { LessonTitleForm } from "./lesson-title-form";
import { VideoUrlForm } from "./video-url-form";
export const LessonModal = ({ open, setOpen, courseId, lesson }) => {
  console.log("Single Lesson", lesson);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        className="sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link
                href={`/dashboard/courses/${courseId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Link>
              <div className="flex items-center justify-end">
                <CourseActions />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">Customize Your chapter</h2>
                </div>
                <LessonTitleForm
                  initialData={{ title: lesson?.title}}
                  courseId={courseId}
                  lessonId={lesson?.id}
                />
                <LessonDescriptionForm
                  initialData={{description: lesson?.description}}
                  courseId={courseId}
                  lessonId={lesson?.id}
                />
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">Access Settings</h2>
                </div>
                <LessonAccessForm
                  initialData={{}}
                  courseId={"1"}
                  chapterId={"1"}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <VideoUrlForm
                initialData={{
                  url: "https://www.youtube.com/embed/Cn4G2lZ_g2I?si=8FxqU8_NU6rYOrG1",
                }}
                courseId={1}
                lessonId={1}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
