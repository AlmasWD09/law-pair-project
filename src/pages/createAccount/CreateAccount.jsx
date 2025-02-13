// import { Form, Input, Button } from "antd";
// import AccountCreate from "../../layout/AccountCreate";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { Tabs } from 'antd';
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const CreateAccount = () => {
//     const [form] = Form.useForm(); // Form instance
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const onChange = (key) => {
//         console.log(key);
//     };


//     const onFinish = (values) => {
//         console.log("Form Data:", values);
//         form.resetFields();
//         setIsModalOpen(false);
//     };

//     const items = [
//         {
//             key: '1',
//             label: 'Client, Looking for an Attorney',
//             children: (
//                 <Form form={form} layout="vertical" onFinish={onFinish}>
//                     <div>
//                         <p className="font-roboto">First name</p>
//                         <Form.Item
//                             name="first-name"
//                             rules={[
//                                 { required: true, message: "Please enter your first name" },
//                             ]}
//                         >
//                             <Input type="text" placeholder="Enter your first name" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>


//                     <div>
//                         <p className="font-roboto">Last name</p>
//                         <Form.Item
//                             name="last-name"
//                             rules={[
//                                 { required: true, message: "Please enter your last name" },
//                             ]}
//                         >
//                             <Input type="text" placeholder="Enter your last name" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>

//                     <div>
//                         <p className="font-roboto">Email</p>
//                         <Form.Item

//                             name="email"
//                             rules={[
//                                 { required: true, message: "Please enter your email!" },
//                                 { type: "email", message: "Invalid email address!" },
//                             ]}
//                         >
//                             <Input type="email" placeholder="Enter your email address" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>


//                     <div>
//                         <p className="font-roboto">Create password</p>
//                         <Form.Item
//                             name="password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your password!',
//                                 },
//                             ]}
//                         >
//                             <Input.Password type="password" placeholder="Create your password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>

//                     <div>
//                         <p className="font-roboto">Confirm password</p>
//                         <Form.Item
//                             name="confirm-password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your Confirm password!',
//                                 },
//                             ]}
//                         >
//                             <Input.Password type="password" placeholder="Confirm your password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>

//                     {/* Submit Button */}
//                     <Form.Item>
//                         <Button htmlType="submit" className="w-full md:min-w-[995px] " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
//                             Create Account
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             ),
//         },
//         {
//             key: '2',
//             label: 'Create Attorney Profile',
//             children:  (
//                 <Form form={form} layout="vertical" onFinish={onFinish}>
//                     <div>
//                         <p className="font-roboto">First name</p>
//                         <Form.Item
//                             name="first-name"
//                             rules={[
//                                 { required: true, message: "Please enter your first name" },
//                             ]}
//                         >
//                             <Input type="text" placeholder="Enter your first name" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>


//                     <div>
//                         <p className="font-roboto">Last name</p>
//                         <Form.Item
//                             name="last-name"
//                             rules={[
//                                 { required: true, message: "Please enter your last name" },
//                             ]}
//                         >
//                             <Input type="text" placeholder="Enter your last name" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>

//                     <div>
//                         <p className="font-roboto">Email</p>
//                         <Form.Item

//                             name="email"
//                             rules={[
//                                 { required: true, message: "Please enter your email!" },
//                                 { type: "email", message: "Invalid email address!" },
//                             ]}
//                         >
//                             <Input type="email" placeholder="Enter your email address" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>


//                     <div>
//                         <p className="font-roboto">Create password</p>
//                         <Form.Item
//                             name="password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your password!',
//                                 },
//                             ]}
//                         >
//                             <Input.Password type="password" placeholder="Create your password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>

//                     <div>
//                         <p className="font-roboto">Confirm password</p>
//                         <Form.Item
//                             name="confirm-password"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input your Confirm password!',
//                                 },
//                             ]}
//                         >
//                             <Input.Password type="password" placeholder="Confirm your password" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
//                         </Form.Item>
//                     </div>

//                     {/* Submit Button */}
//                     <Form.Item>
//                         <Button htmlType="submit" className="w-full md:min-w-[995px] " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
//                             Create Account
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             ),
//         },
//         {
//             key: '3',
//             label: 'Create In-House Counsel/HR Business Partner/Business Owner',
//             children: 'Data Not Found',
//         },
//     ];

//     return (
//         <AccountCreate>
//             <div className="flex flex-col justify-center items-center h-screen bg-[#f5f5f7]">
//                 <div className="min-w-[995px] min-h-[700px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
//                     <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0 pl-3">Create Your Account</h2>
//                     <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs px-4" />
//                 </div>
//                 <div className="text-center pt-8">
//                     <p className="text-[14px] font-roboto">Already have an account? <Link to={'/login'} className="text-primary font-bold font-roboto">Log In</Link></p>
//                 </div>
//             </div>
//         </AccountCreate>
//     );
// };

// export default CreateAccount;


import { Form, Input, Button, Tabs } from "antd";
import AccountCreate from "../../layout/AccountCreate";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CreateAccount = () => {
    const axiosPublic = useAxiosPublic()
    const [form] = Form.useForm();
    const onChange = (key) => {
        console.log(key);
    };

    const onFinish = async (values) => {

        const createAccountInfo = {
            role: "lawyer",
            first_name: values.first_name,
            last_name: values.last_name,
            location: values.location,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation
        }


        try {
            const { data } = await axiosPublic.post('/register', createAccountInfo);
            alert(data.message);
            // form.resetFields()
            console.log(data)

        } catch ({ response }) {
            console.log(response)
            if (response?.errors) {
                // If validation errors are returned from Laravel
                if (response.data.errors.email) {
                    alert(response.data.errors.email[0]);  // Show first email error
                } else if (response.data.errors.password) {
                    alert(response.data.errors.password[0]);  // Show first password error
                } else {
                    alert("There was an error with your registration.");
                }
            } else {
                alert(response?.data?.message || "Something went wrong.");
            }
        }
    };


    const items = [
        {
            key: '1',
            label: 'Client, Looking for an Attorney',
            children: (
                <div className="min-h-[500px]">
                    <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
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
                            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}
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
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Password does not match"));
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
                    <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                        <div>
                            <p>First Name</p>
                            <Form.Item name="first-name" rules={[{ required: true, message: "Please enter your first name" }]}>
                                <Input placeholder="Enter your first name" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>


                        <div>
                            <p>Last Name</p>
                            <Form.Item name="last-name" rules={[{ required: true, message: "Please enter your last name" }]}>
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
                            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                                <Input.Password placeholder="Create your password" className="w-full border border-gray-400 p-2 rounded-md" />
                            </Form.Item>
                        </div>

                        <div>
                            <p>Confirm Password</p>
                            <Form.Item name="confirm-password" rules={[{ required: true, message: "Please input your confirm password!" }]}>
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

    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center  bg-gray-100 px-4 pb-4">
                <div className="w-full md:max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Account</h2>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs px-2 overflow-x-auto" />
                </div>
                <div className="text-center pt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account? <Link to={'/login'} className="text-blue-600 font-bold">Log In</Link>
                    </p>
                </div>
            </div>
        </AccountCreate>
    );
};

export default CreateAccount;

