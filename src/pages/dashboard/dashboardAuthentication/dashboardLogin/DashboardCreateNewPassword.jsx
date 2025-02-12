import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardCreateNewPassword = () => {
  const [form] = Form.useForm(); // Form instance
  const [isModalOpen, setIsModalOpen] = useState(false);


  const onFinish = (values) => {
    console.log("Form Data:", values);
    form.resetFields();
    setIsModalOpen(false);
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#faffff]">
      <div className="max-w-[684px] bg-[#FFFFFF] p-10 lg:px-20 py-8">
        <div className="flex flex-col justify-center">
          <img src="/logo.png" alt="logo" className="w-[183px] h-[56px] mx-auto border" />

          <div className="flex flex-col justify-center items-center pb-10">
            <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">Create new password</h1>
            {/* <p className="font-roboto text-[18px] text-[#929299] ">We will sent a verification code to william***@gmail.com</p> */}
          </div>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <p className="font-roboto">New Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Create your new password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto">Confirm Password</p>
            <Form.Item
              name="re-enter-password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Re-enter your new password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>


          <Form.Item>
            <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
              <Link to={'/admin/dashboard/congratulation'}>Done</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default DashboardCreateNewPassword