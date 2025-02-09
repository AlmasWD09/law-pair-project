
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Tabs } from 'antd';
import { useState } from "react";
import { Link } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";


const Login = () => {
    const [form] = Form.useForm(); // Form instance
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onChange = (key) => {
        console.log(key);
    };

    const onFinish = (values) => {
        console.log("Form Data: 1111", values);
        form.resetFields();
        setIsModalOpen(false);
    };


    const items = [
        {
            key: '1',
            label: 'I’m a client',
            children: (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <div>
                        <p className="font-roboto text-[16px]">Email</p>
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

                    <div>
                        <p className="font-roboto text-[16px]">password</p>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password type="password" placeholder="Create your password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end pb-2 pr-1">
                        <Link to={'/forget-password'}>
                        <h1 className="text-primary font-bold font-roboto">Forgot password?</h1>
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: '2',
            label: 'I’m an attorney',
            children: (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <div>
                        <p className="font-roboto text-[16px]">Email</p>
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

                    <div>
                        <p className="font-roboto text-[16px]">password</p>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password type="password" placeholder="Create your password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end pb-2 pr-1">
                        <Link to={'/forget-password'}>
                        <h1 className="text-primary font-bold font-roboto">Forgot password?</h1>
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center h-screen bg-[#f5f5f7]">
                <div className="min-w-[578px] min-h-[532px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">Log In</h2>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs" />
                </div>



                <div className="text-center pt-8">
                    <p className="text-[14px] font-roboto">Don’t have an account? <Link to={'/create-account'} className="text-primary font-bold font-roboto">Create account</Link></p>
                </div>
            </div>
        </AccountCreate>
    )
}

export default Login