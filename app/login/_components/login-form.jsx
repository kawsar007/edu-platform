"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

import { credientialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for saved credentials
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedTimestamp = localStorage.getItem("timestamp");

    if (savedEmail && savedPassword && savedTimestamp) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - parseInt(savedTimestamp, 10);

      // Check if the saved credentials are within 24 hours
      if (timeDifference < 24 * 60 * 60 * 1000) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberPassword(true);
      } else {
        // Clear expired credentials
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("timestamp");
      }
    }
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");
      const response = await credientialLogin(formData);
      if (!!response.error) {
        console.error(response.error);
        setError(response.error);
      } else {
        toast.success("Logged in successfully");

        // Store in localStorage if rememberPassword is checked
        if (rememberPassword) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("timestamp", new Date().getTime().toString());
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("timestamp");
        }

        router.push("/courses");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mx-auto max-w-sm w-full'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='m@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2 relative'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                id='password'
                name='password'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-2/3 transform -translate-y-1/2'>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='rememberPassword'
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
                className='mr-2'
              />
              <Label htmlFor='rememberPassword'>Remember Password</Label>
            </div>
            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{" "}
          <p>
            Register as{" "}
            <Link href='/register/instructor' className='underline'>
              Instructor
            </Link>{" "}
            or{" "}
            <Link href='/register/student' className='underline'>
              Student
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
