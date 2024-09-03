"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

const Test = () => {
   const handleClick = (mode) => {
      mode ? toast.success("Test Success") : toast.error("Test Error");
   };

   return <Button variant="link" onClick={() => handleClick(false)}>Test Toast</Button>;
};

export default Test;