import { Form, Input } from "antd"


const DashboardLogin = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#faffff]">
            <div className="max-w-[384px] bg-[#FFFFFF] border">
                <div className="flex flex-col justify-center">
                    <img src="/logo.png" alt="logo" />

                    <div className="flex flex-col justify-center items-center">
                        <h1 className="font-roboto text-[#121221] font-semibold text-[20px] md:text-[36px] pt-[40px] pb-[20px]">Welcome back!</h1>
                        <p className="font-roboto text-[18px] text-[#929299] max-w-[341px]">Please enter email & password to continue</p>
                    </div>
                </div>
            </div>

            <Form className="">
                <div>
                    <p className="font-roboto font-bold text-[#121221]">Email</p>
                    <Form.Item name="email" rules={[{ required: true, message: "Please enter your email!" }, { type: "email", message: "Invalid email address!" }]}>
                        <Input placeholder="Enter your email" className="w-full border border-gray-400 p-2 rounded-md" />
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default DashboardLogin