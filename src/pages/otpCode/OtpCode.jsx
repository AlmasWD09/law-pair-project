import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";


const OtpCode = () => {
    const [form] = Form.useForm(); // Form instance
    const [isModalOpen, setIsModalOpen] = useState(false);


    const onFinish = (values) => {
        console.log("Form Data:", values);
        form.resetFields();
        setIsModalOpen(false);
    };
    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center h-screen bg-[#f5f5f7]">
                <div className="min-w-[478px] min-h-[292px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">We’ve sent you an OTP to</h2>
                    <p className="font-roboto text-[#121221] text-[16px] pb-[32px]">immi@gmail.com</p>


                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <div>
                            <p className="font-roboto">OTP code</p>
                            <Form.Item

                                name="email"
                                rules={[
                                    { required: true, message: "Please Enter your OTP!" },
                                    { type: "email", message: "Invalid Enter your OTP!" },
                                ]}
                            >
                                <Input type="email" placeholder="Enter your OTP" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                            </Form.Item>
                        </div>

                        {/* submit button */}
                        <Form.Item>
                            <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                                <Link to={'/create-new-password'}>Submit OTP</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="text-center pt-8">
                    <p className="text-[14px] font-roboto">Didn’t get OTP yet? <Link to={'/'} className="text-primary font-bold font-roboto">Resend</Link></p>
                </div>
            </div>
        </AccountCreate>
    )
}

export default OtpCode