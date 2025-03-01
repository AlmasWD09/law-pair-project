
import { Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Tabs } from 'antd';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {
    const axiosPublic = useAxiosPublic();
    const [clientForm] = Form.useForm(); // Form instance
    const [attorneyForm] = Form.useForm(); // Form instance
    const [isModalOpen, setIsModalOpen] = useState(false);



    const onChange = (key) => {
        clientForm.resetFields();  // Client form reset
        attorneyForm.resetFields(); // Attorney form reset
    };

    const onFinishClient = async (values) => {

        const clientInfo = {
            role: 'user',
            email: values.email,
            password: values.password
        }

        // try {
        //     const response = await axiosPublic.post("/login", clientInfo);
        //     console.log('response--------', response.data)

        //     if (response.data.success) {
        //         alert("login success")
        //     }
        //     else {
        //         alert(response.data.message)
        //     }
        // }
        // catch (error) {
        //     alert("Login Error. plz try again!");
        // }

        clientForm.resetFields();
        setIsModalOpen(false);
    };



    const onFinishAttorney = async (values) => {

        const attorneyInfo = {
            role: "lawyer",
            email: values.email,
            password: values.password
        }


        try {
            const response = await axiosPublic.post("/login", attorneyInfo);
            console.log(response.data)
            if (response.data.success) {
                alert("login success")
            }
            else {
                alert('login failedddd')
            }
        }
        catch (error) {
            alert("Login Error. plz try again!");
        }

        attorneyForm.resetFields();
        setIsModalOpen(false);
    };


    const items = [
        {
            key: '1',
            label: 'I’m a client',
            children: (
                <Form form={clientForm} layout="vertical" onFinish={onFinishClient}>
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
                        <Link to={'/'}>
                        <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                            Log in
                        </Button>
                        </Link>
                    </Form.Item>
                </Form>
            ),
        },

        {
            key: '2',
            label: 'I’m an attorney',
            children: (
                <Form form={attorneyForm} layout="vertical" onFinish={onFinishAttorney}>
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
                    <Link to={'/'}>
                        <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                            Log in
                        </Button>
                        </Link>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center h-[calc(100vh-122px)] bg-[#f5f5f7] container mx-auto px-4 ">
                <div className="w-full md:w-[578px]  bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">Log In</h2>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs" />
                </div>



                <div className="text-center pt-6">
                    <p className="text-[14px] font-roboto">Don’t have an account? <Link to={'/create-account'} className="text-primary font-bold font-roboto">Create account</Link></p>
                </div>
            </div>
        </AccountCreate>
    )
}

export default Login