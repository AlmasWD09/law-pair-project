import { Form, Input, Button, Modal, Space, Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Title from "antd/es/skeleton/Title";


const OtpCode = () => {
    const axiosPublic = useAxiosPublic();
    const [form] = Form.useForm(); // Form instance
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const email = location?.state?.email
    const navigate = useNavigate();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [issModalOpenTwo, setIsModalOpenTwo] = useState(false);
    const [categorieData, setCategorieData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [modalOneValue, setModalOneValue] = useState([])


    const [modalTwoValue, setModalTwoValue] = useState()


    const onFinish = async (values) => {
        // const otpCode = {
        //     otp: values.otp
        // }

        // try {
        //     const response = await axiosPublic.post("/verify-email", otpCode);
        //     if ((response.data.success) && (response.data.access_token)) {

        //         Cookies.set("otpToken", response?.data?.access_token,
        //             { expires: 7, secure: true, sameSite: "Strict" });

        //         toast.success("OTP send successfully.");
        //         navigate('/')
        //         form.resetFields();
        //     } else {
        //         toast.error("Failed to send OTP. Try again.");
        //     }
        // }
        // catch (error) {
        //     toast.error("Wrong OTP. Please try again.");
        // }
        // form.resetFields();

        // setIsModalOpen(false);

        setIsModalOpen(true)
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            const response = await axiosPublic.post("/resent-otp", { email });
            if (response.data.success) {
                toast.success("OTP has been resent successfully.");
            } else {
                toast.error("Failed to resend OTP. Try again.");
            }
        }
        catch (error) {
            toast.error("Error sending OTP. Please try again.");
        }

        setLoading(false);
    };

    // categorie name gat
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/admin/categories?per_page=10`);
                setCategorieData(response?.data?.categories.data)

            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        fetchData();
    }, []);



    //====================== first modal start ==============

    const handleOk = async () => {
        setModalOneValue(selectedOptions)

        setIsModalOpen(false)
        setIsModalOpenTwo(true)
    };


    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedOptions("")
    };

    const handleSelect = (option) => {
        setSelectedOptions((prev) => {
            if (prev.includes(option.id)) {

                return prev.filter((item) => item !== option.id);
            } else if (prev.length < 3) {

                return [...prev, option.id];
            } else {
                return prev;
            }
        });
    };

    //====================== first modal end =================





    //====================== second modal start =================
    const handleSelectModalLowyerTwoValue = (key, value) => {
        setModalTwoValue(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleSelectModalLowyerTwoValue(name, value);
    };

    const handleOkLowyerTwo = async () => {


    }


    const handleCancelLowyerTwo = () => {
        setIsModalOpenTwo(false)
        setIsModalOpen(true)
    }
    //====================== second modal end = =================











    console.log(modalOneValue)

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
                            // rules={[
                            //     { required: true, message: "Please Enter your OTP!" },
                            //     { pattern: /^[0-9]{4,6}$/, message: "Invalid OTP format!" }, // ✅ Ensures 4-6 digit number

                            // ]}
                            >
                                <Input
                                    type="text" // ✅ Use "text" instead of "number" to avoid auto-correction issues
                                    maxLength={6} // ✅ Limits OTP to 6 digits
                                    placeholder="Enter your OTP" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
                            </Form.Item>
                        </div>

                        {/* submit button */}
                        <Form.Item>
                            <Button htmlType="submit" className="w-full " style={{ backgroundColor: "#1b69ad", color: "white", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", padding: "24px" }}>
                                Submit OTP
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="text-center pt-8">
                    <p className="text-[14px] font-roboto">Didn’t get OTP yet? <span onClick={handleResendOtp} className="text-primary font-bold font-roboto">Resend</span></p>
                </div>
            </div>


            {/* =========================  modal start ====================== */}
            {/* modal one */}
            <Modal centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                width={600}
                footer={
                    <div className="font-roboto flex justify-center md:justify-between items-center gap-x-4 md:px-7 pt-[24px]">
                        <button
                            className="w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                            onClick={handleOk}
                        >
                            Continue
                        </button>
                    </div>
                }
            // okText="Continue"
            // okButtonProps={{
            //     className:"w-[50%] h-[50px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
            //   }}
            //   cancelButtonProps={{
            //     className:"w-[50%] h-[50px] md:w-[161px] md:h-[64px] border  text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
            //   }}
            >


                <div>
                    <div style={{ maxWidth: "90%", margin: "auto", textAlign: "center" }}>

                        <svg
                            className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
                            width="100%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                            <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                            <rect x="36" y="19" width="456" height="2" fill="#B6B6BA" />
                            <circle cx="508" cy="20" r="15" stroke="#B6B6BA" strokeWidth="2" />
                        </svg>


                        <Title level={4} className='text-[#000000] font-roboto text-start pb-[8px]'>
                            Select the legal help you need
                        </Title>


                        <Space wrap>
                            {categorieData.map((option, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    disabled={selectedOptions.length === 3 && !selectedOptions.includes(option.id)}
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor: selectedOptions.includes(option.id) ? "#1b69ad" : "#FFFFFF",
                                        color: selectedOptions.includes(option.id) ? "#FFFFFF" : "#1b69ad",
                                        border: "1px solid #B6B6BA",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        fontFamily: "Roboto",
                                        padding: "20px",
                                        cursor: selectedOptions.length === 3 && !selectedOptions.includes(option.id) ? "not-allowed" : "pointer",
                                        opacity: selectedOptions.length === 3 && !selectedOptions.includes(option.id) ? 0.5 : 1,
                                    }}
                                >
                                    {option.name}
                                </Button>

                            ))}
                        </Space>

                    </div>
                </div>
            </Modal>

            {/* ========================= modal tow start ==================== */}
            <Modal centered open={issModalOpenTwo} onOk={handleOkLowyerTwo} onCancel={handleCancelLowyerTwo}
                width={600}
                footer={
                    <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                        <button
                            className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                            onClick={handleCancelLowyerTwo}
                        >
                            Back
                        </button>
                        <button
                            className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                            onClick={handleOkLowyerTwo}
                        >
                            Continue
                        </button>
                    </div>
                }
            >


                <div>
                    <svg
                        className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]" width="40" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="16" fill="#1B69AD" />
                        <path d="M14.167 20.8335L17.5003 24.1668L25.8337 15.8335" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                        <rect x="36" y="19" width="212" height="2" fill="#1B69AD" />
                        <circle cx="264" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                        <circle cx="264" cy="20" r="5" fill="#1B69AD" />
                        <rect x="280" y="19" width="212" height="2" fill="#B6B6BA" />
                        <circle cx="508" cy="20" r="15" stroke="#B6B6BA" strokeWidth="2" />
                    </svg>


                    <hr />

                    <div className='pt-4'>
                        <Title level={4} className='text-[#000000] font-roboto text-start pb-[8px]'>
                            Add your professional details
                        </Title>
                    </div>
                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Where do you practice</p>
                        <Input name='practice' placeholder='e.g.: New Jersey, New York, EOIR (Immigration Court)' style={{ width: '100%', height: '40px' }} />
                    </div>


                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Experience</p>
                        <Select
                            showSearch
                            placeholder="Select..."
                            style={{ width: '100%', height: '40px' }}
                            onChange={value => handleSelectModalLowyerTwoValue("location", value)}
                            options={[
                                { value: 'New Jersey', label: 'New Jersey' },
                                { value: 'New York', label: 'New York' },
                                { value: 'Pennsylvania', label: 'Pennsylvania' },
                                { value: 'Washington, D.C', label: 'Washington, D.C' },
                            ]}
                        />
                    </div>

                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Select your language(s)</p>
                        <Select
                            showSearch
                            placeholder="Select..."
                            style={{ width: '100%', height: '40px' }}
                            onChange={value => handleSelectModalLowyerTwoValue("languages", value)}
                            options={[
                                { label: "English", value: "English" },
                                { label: "Spanish", value: "Spanish" },
                                { label: "German", value: "German" },
                                { label: "Russian", value: "Russian" }
                            ]}
                        />
                    </div>

                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Office address</p>
                        <Input name='address' placeholder='address' style={{ width: '100%', height: '40px' }} />
                    </div>


                    <div className='flex justify-between gap-2'>
                        <div className='pb-4 w-full'>
                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>State</p>
                            <Input name='state' style={{ width: '100%', height: '40px' }} />
                        </div>

                        <div className='pb-4 w-full'>
                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>Zip code</p>
                            <Input name='zipCode' style={{ width: '100%', height: '40px' }} />
                        </div>
                    </div>
                </div>

            </Modal>


        </AccountCreate>
    )
}

export default OtpCode