
import { Form, Input, Button, Tabs } from "antd";
import AccountCreate from "../../layout/AccountCreate";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const CreateAccount = () => {
    const axiosPublic = useAxiosPublic()
    const [formOne] = Form.useForm();
    const [formTwo] = Form.useForm();
    const navigate = useNavigate();
    const [roleValue, setRoleValue] = useState(null)

    const onChange = (key) => {
        console.log(key);
    };

    const onFinishOne = async (values) => {

        const createAccountInfo = {
            role: "user",
            first_name: values.first_name,
            last_name: values.last_name,
            location: values.location,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        }


        try {
            const res = await axiosPublic.post('/register', createAccountInfo);
            console.log(res, 'data----------')

            if (res.data.success) {
                setRoleValue(res.data.success.role)
                toast.success(res.data.message);
                navigate('/otp-code', { state: { email: values.email } })
                formOne.resetFields()

            }

        } catch ({ response }) {
            console.log(response)
            if (response?.errors) {
                // If validation errors are returned from Laravel
                if (response.data.errors.email) {
                    toast.error(response.data.errors.email[0]);  // Show first email error
                } else if (response.data.errors.password) {
                    toast.error(response.data.errors.password[0]);  // Show first password error
                } else {
                    toast.error("There was an error with your registration.");
                }
            } else {
                toast.error(response?.data?.message || "Something went wrong.");
            }
        }
    };


    const onFinishTwo = async (values) => {

        const createAttorneyInfo = {
            role: "lawyer",
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        }


        try {
            const res = await axiosPublic.post('/register', createAttorneyInfo);
            console.log(res.data, 'data 2222222----------')

            if (res.data.success) {
                setRoleValue(res.data.success.role)
                toast.success(res.data.message);
                navigate('/otp-code', { state: { email: values.email } })
                formTwo.resetFields()

            }

        } catch ({ response }) {
            if (response?.errors) {
                // If validation errors are returned from Laravel
                if (response.data.errors.email) {
                    toast.error(response.data.errors.email[0]);  // Show first email error
                } else if (response.data.errors.password) {
                    toast.error(response.data.errors.password[0]);  // Show first password error
                } else {
                    toast.error("There was an error with your registration.");
                }
            } else {
                toast.error(response?.data?.message || "Something went wrong.");
            }
        }
    }

    const items = [
        {
            key: '1',
            label: 'Client, Looking for an Attorney',
            children: (
                <div className="min-h-[500px]">
                    <Form form={formOne} layout="vertical" onFinish={onFinishOne} className="space-y-4">
                        <div>
                            <p>First Name</p>
                            <Form.Item name="first_name" rules={[{ required: true, message: "Please enter your first name" }]}>
                                <Input placeholder="Enter your first name" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>


                        <div>
                            <p>Last Name</p>
                            <Form.Item name="last_name" rules={[{ required: true, message: "Please enter your last name" }]}>
                                <Input placeholder="Enter your last name" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Email</p>
                            <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!" }, { type: "email", message: "Invalid email address!" }]}>
                                <Input type="email" placeholder="Enter your email address" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Location</p>
                            <Form.Item name="location" rules={[{ required: true, message: "Please enter your location" }]}>
                                <Input placeholder="Enter your location" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Create Password</p>
                            <Form.Item name="password" rules={[
                                { required: true, message: "Please input your password!" },
                                { min: 8, message: "Password must be at least 8 characters!" }
                            ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Create your password" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Confirm Password</p>
                            <Form.Item name="password_confirmation"
                                dependencies={["password"]}
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
                                <Input.Password placeholder="Confirm your password" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button htmlType="submit" block style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>Create Account</Button>

                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Create Attorney Profile',
            children: (
                <div className="min-h-[500px]">
                    <Form form={formTwo} layout="vertical" onFinish={onFinishTwo} className="space-y-4">
                        <div>
                            <p>First Name</p>
                            <Form.Item name="first_name" rules={[{ required: true, message: "Please enter your first name" }]}>
                                <Input placeholder="Enter your first name" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>


                        <div>
                            <p>Last Name</p>
                            <Form.Item name="last_name" rules={[{ required: true, message: "Please enter your last name" }]}>
                                <Input placeholder="Enter your last name" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>


                        <div>
                            <p>Email</p>
                            <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!" }, { type: "email", message: "Invalid email address!" }]}>
                                <Input type="email" placeholder="Enter your email address" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Create Password</p>
                            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" },
                            { min: 8, message: "Password must be at least 8 characters!" }
                            ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Create your password" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Confirm Password</p>
                            <Form.Item name="password_confirmation" dependencies={["password"]}
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
                                hasFeedback>
                                <Input.Password placeholder="Confirm your password" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button htmlType="submit" block style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>Create Account</Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Create In-House Counsel/HR Business Partner/Business Owner',
            children: <div className="min-h-[500px] flex items-center justify-center"><p className="text-center text-2xl font-bold text-gray-500">Data Not Found</p></div>,
        },
    ];


    const handleLogin = () => {
        navigate('/login',)
    }
    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center  bg-gray-100 px-4 py-4">
                <div className="w-full md:max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Account</h2>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs px-2 overflow-x-auto" />
                </div>
                <div className="text-center pt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account? <span onClick={handleLogin} className="text-blue-600 font-bold cursor-pointer">Log In</span>
                    </p>
                </div>
            </div>
        </AccountCreate>
    );
};

export default CreateAccount;

