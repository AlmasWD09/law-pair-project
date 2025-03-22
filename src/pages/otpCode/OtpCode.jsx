import { Form, Input, Button, Modal, Space, Select, Upload, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Title from "antd/es/skeleton/Title";
import { UploadOutlined } from "@ant-design/icons";



const OtpCode = () => {
    const axiosPublic = useAxiosPublic();
    const [form] = Form.useForm(); // Form instance
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const email = location?.state?.email
    const navigate = useNavigate();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [issModalOpenTwo, setIsModalOpenTwo] = useState(false);
    const [issModalOpenThree, setIsModalOpenThree] = useState(false)

    const [categorieData, setCategorieData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [modalOneValue, setModalOneValue] = useState([])
    const [modalTwoValue, setModalTwoValue] = useState({
        practice: "",
        location: "",
        languages: "",
        address: "",
        state: "",
        zipCode: "",
    });


    // modal three
    const [fileList, setFileList] = useState([]);
    const [webLink, setWebLink] = useState("");
    const [availability, setAvailability] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const lawyerToken = Cookies.get("lawyerToken");


    const onFinish = async (values) => {
        const otpCode = {
            otp: values.otp
        }

        try {
            const response = await axiosPublic.post("/verify-email", otpCode);
            if ((response.data.success) && (response.data.access_token)) {

                Cookies.set("lawyerToken", response?.data?.access_token,
                    { expires: 7, secure: true, sameSite: "Strict" });

                toast.success("OTP send successfully.");
                setIsModalOpen(true)
                form.resetFields();
            } else {
                toast.error("Failed to send OTP. Try again.");
            }
        }
        catch (error) {
            toast.error("Wrong OTP. Please try again.");
        }
        form.resetFields();

        setIsModalOpen(false);

        // setIsModalOpen(true)
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

    // Handle File Upload
    const handleChange = ({ file, fileList }) => {
        // Ensure we store the file with originFileObj
        setFileList(fileList.map(file => ({ ...file, originFileObj: file.originFileObj || file })));
    };


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
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalTwoValue((prev) => ({ ...prev, [name]: value }));
    };

    // Handle select change
    const handleSelectChange = (field, value) => {
        setModalTwoValue((prev) => ({ ...prev, [field]: value }));
    };



    const handleOkLowyerTwo = async () => {

        setIsModalOpenThree(true)
        setIsModalOpenTwo(false)
    }


    const handleCancelLowyerTwo = () => {
        setIsModalOpenTwo(false)
        setIsModalOpen(true)
    }
    //====================== second modal end = =================





    // ===================== three modal start ===================
    // Handle Availability Selection
    const handleAvailabilityChange = (value) => setAvailability(value);

    // Handle Time Selection
    const handleTimeChange = (time, timeString, type) => {
        if (type === "start") setStartTime(timeString);
        if (type === "end") setEndTime(timeString);
    };


    const handleOkLowyerThree = async () => {

        const schedule = {
            day: availability,
            time: `${startTime} - ${endTime}`,

        }

        const formData = new FormData();
        formData.append('service_ids', JSON.stringify(modalOneValue))
        formData.append('practice_area', modalTwoValue.practice)
        formData.append('experience', modalTwoValue.experience)
        formData.append('languages', modalTwoValue.languages)
        if (fileList && fileList.length > 0) {
            formData.append('avatar', fileList[0].originFileObj); // Fix: Use originFileObj
        }
        formData.append('state', modalTwoValue.state)
        formData.append('address', modalTwoValue.address)
        formData.append('phone', modalTwoValue.phone)

        formData.append('web_link', webLink)
        formData.append('schedule', JSON.stringify(schedule));



        // console.log(modalOneValue)
        // console.log(modalTwoValue)
        formData.forEach((value, key) => {
            console.log(key, value);
        });



        try {
            const response = await axiosPublic.post('/lawyer/update-profile', formData, {
                headers: {
                    Authorization: `Bearer ${lawyerToken}`,
                    "Accept": "application/json"
                }

            });


            console.log(response.data)
            if (response.data.success) {
                toast.success('Profile create successfully')
                navigate('/lawyer-profile')
            } else {
                toast.error("something is wrong! please try again.");
            }

        } catch (error) {
            toast.error("something is wrong! please try again.");
        }
    }

    const handleCancelLowyerThree = () => {
        setIsModalOpenThree(false)
        setIsModalOpenTwo(true)
    }
    // ===================== three modal end  ====================



    useEffect(() => {
        // Disable scroll when any modal is open
        if (isModalOpen || issModalOpenTwo || issModalOpenThree) {
            document.body.style.overflow = "hidden";
        } else {
            // Re-enable scroll when no modal is open
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto"; // Cleanup function
        };
    }, [isModalOpen, issModalOpenTwo, issModalOpenThree]);





    // console.log(modalOneValue)
    // console.log(modalTwoValue)

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
                        <Input name='practice'
                            value={modalTwoValue.practice}
                            onChange={handleInputChange}
                            placeholder='e.g.: New Jersey, New York, EOIR (Immigration Court)' style={{ width: '100%', height: '40px' }} />
                    </div>


                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Experience</p>
                        <Select
                            showSearch
                            placeholder="Select..."
                            style={{ width: '100%', height: '40px' }}
                            onChange={(value) => handleSelectChange("experience", value)}
                            options={[
                                { label: "1-3 Years", value: "1-3 Years" },
                                { label: "4-7 Years", value: "4-7 Years" },
                                { label: "8+ Years", value: "8+ Years" }
                            ]}
                        />
                    </div>

                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Select your language(s)</p>
                        <Select
                            showSearch
                            placeholder="Select..."
                            style={{ width: '100%', height: '40px' }}
                            onChange={(value) => handleSelectChange("languages", value)}
                            options={[
                                { label: "English", value: "English" },
                                { label: "Spanish", value: "Spanish" },
                                { label: "German", value: "German" },
                                { label: "Russian", value: "Russian" }
                            ]}
                        />
                    </div>

                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Phone</p>
                        <Input name='phone'
                            value={modalTwoValue.phone}
                            onChange={handleInputChange}
                            placeholder='phone' style={{ width: '100%', height: '40px' }} />
                    </div>

                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Office address</p>
                        <Input name='address'
                            value={modalTwoValue.address}
                            onChange={handleInputChange}
                            placeholder='address' style={{ width: '100%', height: '40px' }} />
                    </div>


                    <div className='flex justify-between gap-2'>
                        <div className='pb-4 w-full'>
                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>State</p>
                            <Input name='state'
                                value={modalTwoValue.state}
                                onChange={handleInputChange}
                                style={{ width: '100%', height: '40px' }} />
                        </div>

                        <div className='pb-4 w-full'>
                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>Zip code</p>
                            <Input
                                value={modalTwoValue.zipCode}
                                onChange={handleInputChange}
                                name='zipCode' style={{ width: '100%', height: '40px' }} />
                        </div>
                    </div>
                </div>

            </Modal>


            {/* ======================= modal three start ===================== */}
            <Modal centered open={issModalOpenThree} onOk={handleOkLowyerThree} onCancel={handleCancelLowyerThree}
                width={600}
                footer={
                    <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                        <button
                            className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                            onClick={handleCancelLowyerThree}
                        >
                            Back
                        </button>
                        <button
                            className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                            onClick={handleOkLowyerThree}
                        >
                            Continue
                        </button>
                    </div>
                }
            >


                <div>
                    <svg
                        className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
                        width="528" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="16" fill="#1B69AD" />
                        <path d="M14.1665 20.8335L17.4998 24.1668L25.8332 15.8335" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                        <rect x="36" y="19" width="212" height="2" fill="#1B69AD" />
                        <circle cx="264" cy="20" r="16" fill="#1B69AD" />
                        <path d="M258.167 20.8335L261.5 24.1668L269.833 15.8335" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                        <rect x="280" y="19" width="212" height="2" fill="#1B69AD" />
                        <circle cx="508" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                        <circle cx="508" cy="20" r="5" fill="#1B69AD" />
                    </svg>



                    <hr />

                    <div className='pt-4'>
                        <Title level={4} className='text-[#000000] font-roboto text-start pb-[8px]'>
                            Add your profile photo and availability
                        </Title>
                    </div>



                    <div className="pb-4 w-full">
                        <p className="text-[14px] font-roboto font-bold text-[#001018]">Upload profile photo</p>
                        <div className="w-full">
                            <Upload
                                fileList={fileList}
                                onChange={handleChange}
                                beforeUpload={() => false}
                                style={{ width: '100%', height: '40px' }}
                                className="upload-component"
                            >
                                {fileList.length >= 1 ? null : (
                                    <Button
                                        icon={<UploadOutlined />}
                                        style={{ width: '100%', height: '40px' }}
                                    >
                                        Upload Image
                                    </Button>
                                )}
                            </Upload>
                        </div>
                    </div>




                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Website link (optional)</p>
                        <Input
                            onChange={(e) => setWebLink(e.target.value)}
                            placeholder='Include a link to your website here' style={{ width: '100%', height: '40px' }} />
                    </div>


                    <div className='pb-4'>
                        <div className='flex flex-col justify-between items-center gap-6 pb-4'>
                            <div className='w-full'>
                                <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                                    <Select
                                        defaultValue="Select day.."
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={handleAvailabilityChange}
                                        options={[
                                            { value: 'Monday', label: 'Monday' },
                                            { value: 'Tuesday', label: 'Tuesday' },
                                            { value: 'Wednesday', label: 'Wednesday' },
                                            { value: 'Thursday', label: 'Thursday' },
                                            { value: 'Friday', label: 'Friday' },
                                            { value: 'Saturday', label: 'Saturday' },
                                            { value: 'Sunday', label: 'Sunday' },
                                        ]}
                                    />
                            </div>


                            <div className='w-full'>
                                <p className='text-[14px] font-roboto font-bold text-primary '>Start Time</p>
                                <TimePicker style={{ width: "100%", height: '40px' }} onChange={(time, timeString) => handleTimeChange(time, timeString, "start")}
                                />
                            </div>

                            <div className='w-full'>
                                <p className='text-[14px] font-roboto font-bold text-primary '>End Time</p>
                                <TimePicker style={{ width: "100%", height: '40px' }} onChange={(time, timeString) => handleTimeChange(time, timeString, "end")} />
                            </div>
                        </div>
                    </div>


                    <div className='pb-4'>
                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Preview</p>
                        {/* <Space wrap>
                            {lowyerOptions.map((option) => (
                                <Button
                                    key={option}
                                    onClick={() => handleSelectLowyer(option)}
                                    style={{
                                        borderRadius: 20,

                                        backgroundColor: selectedOptions.includes(option) ? "#1b69ad" : "#FFFFFF",
                                        color: selectedOptions.includes(option) ? "#FFFFFF" : "#1b69ad",
                                        border: "1px solid #B6B6BA",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        fontFamily: "Roboto",
                                        padding: "20px"
                                    }}
                                >
                                    {option}
                                </Button>
                            ))}
                        </Space> */}
                    </div>
                    <div className='flex flex-col md:flex-row gap-[12px]'>
                        <p className='font-roboto text-[14px] text-[#121221]'>11:30-12:30 pm</p>
                        <p className='font-roboto text-[14px] text-[#121221]'>11:30-12:30 pm</p>
                        <p className='font-roboto text-[14px] text-[#121221]'>11:30-12:30 pm</p>
                    </div>
                </div>

            </Modal>


        </AccountCreate>
    )
}

export default OtpCode