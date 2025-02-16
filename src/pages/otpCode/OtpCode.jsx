import { Form, Input, Button } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";


const OtpCode = () => {
    const axiosPublic = useAxiosPublic();
    const [form] = Form.useForm(); // Form instance
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const email = location?.state?.email
    const navigate = useNavigate();

console.log(email)
console.log(" email ni")

    const onFinish = async (values) => {
        console.log("OTP Value:", values.otp); // ✅ Logs the OTP value
        const otpCode = {
            otp: values.otp
        }

        // try {
        //     const response = await axiosPublic.post("/verify-email", otpCode);
        //     console.log('check token---', response.data)
        //     if ((response.data.success) && (response.data.access_token)) {

        //         Cookies.set("otpToken", response?.data?.access_token, { expires: 7, secure: true, sameSite: "Strict" });

        //         alert("OTP send successfully.");
        //         navigate('/create-new-password')
        //         form.resetFields();
        //     } else {
        //         alert("Failed to send OTP. Try again.");
        //     }
        // }
        // catch (error) {
        //     alert("Error sending OTP. Please try again.");
        // }

        form.resetFields();
        setIsModalOpen(false);
    };



    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.post("/resent-otp", { email });
            console.log(response.data)
            if (response.data.success) {
                alert("OTP has been resent successfully.");
            } else {
                alert("Failed to resend OTP. Try again.");
            }
        }
        catch (error) {
            alert("Error sending OTP. Please try again.");
        }

        setLoading(false);
    };

    return (
        <AccountCreate>
            <div className="flex flex-col justify-center items-center bg-[#f5f5f7] h-[calc(100vh-122px)] container mx-auto px-4">
                <div className="w-full md:w-[478px] min-h-[292px] bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
                    <h2 className="text-[26px] font-bold font-roboto text-[#10101E]  mb-0">We’ve sent you an OTP to</h2>
                    <p className="font-roboto text-[#121221] text-[16px] pb-[32px]">{email || "immi@gmail.com"}</p>


                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <div>
                            <p className="font-roboto">OTP code</p>
                            <Form.Item

                                name="otp"
                                rules={[
                                    { required: true, message: "Please Enter your OTP!" },
                                    { pattern: /^[0-9]{4,6}$/, message: "Invalid OTP format!" }, // ✅ Ensures 4-6 digit number

                                ]}
                            >
                                <Input
                                    type="text" // ✅ Use "text" instead of "number" to avoid auto-correction issues
                                    maxLength={6} // ✅ Limits OTP to 6 digits
                                    placeholder="Enter your OTP" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                            </Form.Item>
                        </div>

                        {/* submit button */}
                        <Form.Item>
                           <Link to={'/create-new-password'}>
                           <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                                Submit OTP
                            </Button>
                           </Link>
                        </Form.Item>
                    </Form>
                </div>
                <div className="text-center pt-8">
                    <p className="text-[14px] font-roboto">Didn’t get OTP yet? <Link to={'#'} onClick={handleResendOtp} className="text-primary font-bold font-roboto">Resend</Link></p>
                </div>
            </div>
        </AccountCreate>
    )
}

export default OtpCode