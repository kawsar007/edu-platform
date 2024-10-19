import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const EnrollCourse = ({ asLink }) => {
  return (
    <div>
      {
        asLink ? (
          <Button
          type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg"}))}>
            Enroll Now
          </Button>
        )
      }
    </div>
  )
}