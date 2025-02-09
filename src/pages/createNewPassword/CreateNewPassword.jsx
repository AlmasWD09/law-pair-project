import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";


export const CreateNewPassword = () => {
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
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0 pb-[32px]">Create a new password</h2>

                    <Form form={form} layout="vertical" onFinish={onFinish}>
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
                            {/* <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                                Save password
                            </Button> */}
                            <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                           <Link to={'/password-successfull'}> Save password</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AccountCreate>
    )
}
