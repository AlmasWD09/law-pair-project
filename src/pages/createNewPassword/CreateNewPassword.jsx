import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import Cookies from "js-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";


export const CreateNewPassword = () => {
    const [form] = Form.useForm(); // Form instance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const token = Cookies.get("otpToken");

    const onFinish = async (values) => {
        const CreateNewPasswordInfo = {
            password: values.password,
            password_confirmation: values.password_confirmation
        }


        try {
            const response = await axiosPublic.post("/reset-password", CreateNewPasswordInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json"
                    // ✅ Send token in Authorization header
                }

            }
            );

            console.log('response----->', response.data)

            if (response.data.success) {
                alert(response.data.message);

                navigate('/password-successfull')
                form.resetFields();
            } else {
                alert("Failed-----");
            }
        }
        catch (error) {
            alert("Something went wrong!. Please try again.");
        }

        form.resetFields();
        setIsModalOpen(false);
    };
    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center h-[calc(100vh-122px)] bg-[#f5f5f7] container mx-auto px-4">
                <div className="w-full md:w-[478px] min-h-[292px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0 pb-[32px]">Create a new password</h2>

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <div>
                            <p className="font-roboto">Enter your new password</p>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: "Please input your password!" },
                                    { min: 8, message: "Password must be at least 8 characters!" }
                                ]}
                                hasFeedback
                            >
                                <Input.Password type="password" placeholder="Create your new password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                            </Form.Item>
                        </div>

                        <div>
                            <p className="font-roboto">Re-enter new password</p>
                            <Form.Item
                                name="password_confirmation"
                                rules={[
                                    { required: true, message: "Please input your confirm password!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value.length < 8) {
                                                return Promise.reject(new Error("Password must be at least 8 characters!"));
                                            }
                                            if (getFieldValue("password") !== value) {
                                                return Promise.reject(new Error("Password does not match"));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password type="password" placeholder="Re-enter your new password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                            </Form.Item>
                        </div>


                        <Form.Item>
                           <Link to={'/password-successfull'}>
                           <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                                Save password
                            </Button>
                           </Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AccountCreate>
    )
}
