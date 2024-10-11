import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { dbConnect } from "@/service/mongo";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "EduPlatform",
  description: "Explore || Learn || Build || Share",
};

export default async function RootLayout({ children }) {
  const connection = await dbConnect();  
  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
