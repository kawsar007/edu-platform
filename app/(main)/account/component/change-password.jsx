"use client";

import { changePassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setPasswordState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function doPassowrdChange(event) {
    event.preventDefault();
    console.log(passwordState);

    if (passwordState.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (passwordState.newPassword !== passwordState.retypePassword) {
      toast.error("New password and re-type password do not match.");
      return;
    }

    try {
      await changePassword(
        email,
        passwordState?.oldPassword,
        passwordState?.newPassword,
      );

      setPasswordState({
        oldPassword: "",
        newPassword: "",
        retypePassword: "",
      });

      toast.success(`Password changed successfully.`);
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    }
  }

  return (
    <div>
      <h5 className='text-lg font-semibold mb-4'>Change password :</h5>
      <form onSubmit={doPassowrdChange}>
        <div className='grid grid-cols-1 gap-5'>
          <div className='relative'>
            <Label className='mb-2 block'>Old password :</Label>
            <Input
              type={showOldPassword ? "text" : "password"}
              value={passwordState.oldPassword}
              placeholder='Old password'
              id='oldPassword'
              name='oldPassword'
              onChange={handleChange}
              required=''
            />
            <button
              type='button'
              onClick={() => setShowOldPassword(!showOldPassword)}
              className='absolute right-2 top-2/3 transform -translate-y-1/2'>
              {showOldPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className='relative'>
            <Label className='mb-2 block'>New password :</Label>
            <Input
              type={showNewPassword ? "text" : "password"}
              value={passwordState.newPassword}
              placeholder='New password'
              id='newPassword'
              name='newPassword'
              onChange={handleChange}
              required=''
            />
            <button
              type='button'
              onClick={() => setShowNewPassword(!showNewPassword)}
              className='absolute right-2 top-2/3 transform -translate-y-1/2'>
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className='relative'>
            <Label className='mb-2 block'>Re-type New password :</Label>
            <Input
              type={showRetypePassword ? "text" : "password"}
              value={passwordState.retypePassword}
              placeholder='Re-type New password'
              required=''
              id='retypePassword'
              name='retypePassword'
              onChange={handleChange}
            />
            <button
              type='button'
              onClick={() => setShowRetypePassword(!showRetypePassword)}
              className='absolute right-2 top-2/3 transform -translate-y-1/2'>
              {showRetypePassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <Button className='mt-5' type='submit'>
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
