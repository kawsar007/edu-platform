"use client";

import { updateContactInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactInfo = ({ email, userInfo }) => {
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [url, setUrl] = useState({
    facebook: userInfo?.social_media?.facebook || "",
    twitter: userInfo?.social_media?.twitter || "",
    linkedin: userInfo?.social_media?.linkedin || "",
    instagram: userInfo?.social_media?.instagram || "",
  });
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setIsChanged(true);
  };

  const handleUrlChange = (e) => {
    const { name, value } = e.target;
    setUrl((prevUrl) => ({
      ...prevUrl,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateContactInfo(email, phone, url);
      toast.success("Contact Info updated successfully.");
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className='text-lg font-semibold mb-4'>Contact Info :</h5>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-5'>
          <div>
            <Label className='mb-2 block'>Phone No. :</Label>
            <Input
              name='number'
              id='number'
              type='number'
              placeholder='Phone :'
              value={phone} // Bind phone state
              onChange={handlePhoneChange} // Handle phone change
            />
          </div>
          <div>
            <Label className='mb-2 block'>Facebook :</Label>
            <Input
              name='facebook' // Update name for social links
              id='facebook'
              type='url'
              placeholder='Facebook URL'
              value={url?.facebook} // Bind facebook state
              onChange={handleUrlChange} // Handle URL change
              className='mb-2'
            />

            <Label className='mb-2 block'>Twitter :</Label>
            <Input
              name='twitter'
              id='twitter'
              type='url'
              placeholder='Twitter URL'
              value={url?.twitter}
              onChange={handleUrlChange}
              className='mb-2'
            />

            <Label className='mb-2 block'>Linkedin :</Label>
            <Input
              name='linkedin'
              id='linkedin'
              type='url'
              placeholder='LinkedIn URL'
              value={url?.linkedin}
              onChange={handleUrlChange}
              className='mb-2'
            />

            <Label className='mb-2 block'>Instagram :</Label>
            <Input
              name='instagram'
              id='instagram'
              type='url'
              placeholder='Instagram URL'
              value={url?.instagram}
              onChange={handleUrlChange}
            />
          </div>
        </div>
        <Button className='mt-5' type='submit' disabled={!isChanged}>
          {loading ? <>Add <Loader className='animate-spin' /></>  : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
