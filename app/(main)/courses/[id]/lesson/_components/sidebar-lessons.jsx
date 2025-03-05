import {
  AccordionContent
} from "@/components/ui/accordion";

import { SidebarLessonItems } from "./sidebar-lesson-items";

export const SidebarLessons = () => {
  return (
    <>
     <AccordionContent>
          <div className='flex flex-col w-full gap-3'>
            {/* active and completed */}
            <SidebarLessonItems />
          </div>
        </AccordionContent>
    </>
  )
};