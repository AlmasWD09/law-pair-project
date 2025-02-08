import { Form, Input, Button } from "antd";
import AccountCreate from "../../layout/AccountCreate";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Tabs } from 'antd';

const CreateAccount = () => {
    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: 'Client, Looking for an Attorney',
            children: (
                <Form layout="vertical" requiredMark={false}>
                    {/* First Name and Last Name Inputs */}
                    <div>
                        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter your first name!" }]}>
                            <Input placeholder="First Name" className="w-full md:w-[900px]" />
                        </Form.Item>

                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter your last name!" }]}>
                            <Input placeholder="Last Name" className="w-full md:w-[900px]" />
                        </Form.Item>
                    </div>

                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Email" className="w-full md:w-[900px]" />
                    </Form.Item>

                    {/* Password Fields */}
                    <Form.Item label="Create Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                        <Input.Password
                            placeholder="Enter password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="w-full md:w-[900px]"
                        />
                    </Form.Item>

                    <Form.Item label="Confirm Password" name="confirmPassword" dependencies={["password"]} hasFeedback
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="w-full md:w-[900px]"
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full md:w-[900px]">
                            Create Account
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: '2',
            label: 'Create Attorney Profile',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Create In-House Counsel/HR Business Partner/Business Owner',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="max-w-[995px] min-h-[700px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
                <div className="text-center pt-8">
                    <p className="text-[14px] font-roboto">Already have an account? <span className="text-primary font-bold">Log In</span></p>
                </div>
            </div>
        </AccountCreate>
    );
};

export default CreateAccount;
