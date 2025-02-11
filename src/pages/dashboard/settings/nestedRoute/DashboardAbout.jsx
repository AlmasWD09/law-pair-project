import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';


const DashboardAbout = () => {
  const [content, setContent] = useState('');
  const editor = useRef(null);

  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">About us</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can edit personal information</p>



        <div className="w-full mt-6 ">
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onChange={(newContent) => {
              setContent(newContent);
              setValue('content', newContent);
            }}
          />
        </div>

        {/* create content show in add form */}
        <div className="mt-4">
          <h2>Content Preview</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  )
}

export default DashboardAbout