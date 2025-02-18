
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { Button } from 'antd';
import toast from 'react-hot-toast';

const DashboardAbout = () => {
  const [content, setContent] = useState('');
  const editor = useRef(null); // Correctly initialize ref


  const handleUpdate = async () => {

    // try {

    //   const response = await axios.post('url', { content });
    //   console.log('Server Response:', response.data);
    //   toast.success('Content updated successfully!');

    // } catch (error) {
    //   console.error('Error updating content:', error);
    //   toast.error('Failed to update content');
    // }
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
            // config={{
            //   height: "400px", // Set your desired height
            // }}
            onChange={(newContent) => {
              console.log("Editor Content:", newContent);
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



