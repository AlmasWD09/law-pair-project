import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ForgetPassword = () => {
    const axiosPublic = useAxiosPublic();
    const [form] = Form.useForm(); // Form instance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const onFinish = async (values) => {
        console.log("Form Data:", values);
        const forgetInfo = {
            email: values.email,
        }

        try {
            const response = await axiosPublic.post('/resent-otp', forgetInfo)

            if (response.data.success) {
                navigate('/otp-code',{state:{email:forgetInfo.email}})

                alert(response.data.message)
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.log(error)
        }


        form.resetFields();
        setIsModalOpen(false);
    };

    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center h-[calc(100vh-122px)] bg-[#f5f5f7] container mx-auto px-4">
                <div className="w-full md:w-[478px] min-h-[292px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">Forgot password?</h2>
                    <p className="font-roboto text-[#121221] text-[16px] pb-[32px]">No worries, we’re here help you to recover your password.</p>
                    {/* <Form form={form} layout="vertical" onFinish={onFinish}>
                        <div>
                            <p className="font-roboto">Enter your new password</p>
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
                            <p className="font-roboto">Re-enter new password</p>
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
                            Save password
                            </Button>
                        </Form.Item>
                    </Form> */}

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <div>
                            <p className="font-roboto">Submit your email address</p>
                            <Form.Item

                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email!" },
                                    { type: "email", message: "Invalid email address!" },
                                ]}
                            >
                                <Input type="email" placeholder="Enter your email address" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                            </Form.Item>
                        </div>

                        {/* submit button */}
                        <Form.Item>
                            <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                                Get OTP
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AccountCreate>
    )
}

export default ForgetPassword