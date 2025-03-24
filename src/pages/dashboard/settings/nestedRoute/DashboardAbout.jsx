
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Cookies from "js-cookie";



const DashboardAbout = () => {
  const axiosPublic = useAxiosPublic();
  const [content, setContent] = useState('');
  const editor = useRef(null);


  // const config = {
  //   minHeight: 500, // Ensures minimum space
  //   maxHeight: 500, // Expands but within limit
  //   width: "100%",
  //   autofocus: true, 
  //   autoGrow: true, // Allows multiple text inputs
  //   overflow: "scroll",
  // };

  const token = Cookies.get("adminToken");
  const handleUpdate = async () => {

    const aboutInfo = {
      about: content
    }

    try {

      const response = await axiosPublic.post('/admin/update-about', aboutInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        toast.success('Content updated successfully!');
      }
      else {
        toast.error("Failed! please try again")
      }

    } catch (error) {
      toast.error('Failed to update content');
    }
  };



  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">About us</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can edit personal information</p>

        <div className="w-full mt-6">
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>

        <Button
          htmlType="submit"
          block
          style={{ backgroundColor: "#1E73BE", color: "white", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold", margin: "10px 0px" }}
          onClick={handleUpdate}
        >
          Update
        </Button>

        {/* Preview updated content */}
        <div className="mt-4">
          <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Preview update content:</h1>
          <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin writes about us</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardAbout;



