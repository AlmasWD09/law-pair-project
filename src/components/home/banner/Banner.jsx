
import { useState } from 'react';
import { Button, Typography, Space, Modal, Select, TimePicker, DatePicker } from "antd";
const { Title } = Typography;


import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { key } from 'localforage';



const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTow, setIsModalOpenTwo] = useState(false);
    const [isModalOpenAttonemy, setIsModalOpenAttonemy] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [secondSelectValue, setSecondSelecteValue] = useState({
        location: null,
        city: null,
    })
    // const [selectedLocation, setSelectedLocation] = useState(null);
    // const [selectedCity, setSelectedCity] = useState(null);
    const [formData, setFormData] = useState({
        lawyerExperience: null,
        location: null,
        languages: null,
        date: null,
        time: null
    });

    const navigate = useNavigate()








    //====================== first modal start ==============
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        if (selectedOptions.length === 0) {
            console.log("No options selected.");
            return;
        }
   


        setIsModalOpen(false)
        // setSelectedOptions("")
        setIsModalOpenTwo(true)


        // try {
        //     const response = await axios.post('url', {
        //         selectedOptions: selectedOptions,
        //     });

        //     console.log("Server Response:", response.data);
        //     setIsModalOpen(false);
        // } catch (error) {
        //     console.error("Error sending data to the server:", error);
        // }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedOptions("")
    };


    const options = [
        "Immigration",
        "Wills & trusts",
        "Family and Matrimonial",
        "Trademarks",
        "Advanced Care Planning",
        "Criminal Defense",
        "Residential Real Estate",
        "Business Formation",
        "Commercial Real Estate",
    ];

    const handleSelect = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    //====================== first modal end =================



    // ===== modal two start ===============

    // Location er options
    const locationOptions = [
        { value: '1', label: 'A ' },
        { value: '2', label: 'B ' },
        { value: '3', label: 'C' },
    ];

    // City er options
    const cityOptions = [
        { value: '4', label: 'E' },
        { value: '5', label: 'F' },
        { value: '6', label: 'G ' },
    ];

    // Select Value Change Function
    const handleSelectModalTwoValue = (key, value) => {
        setSecondSelecteValue(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleOkTwo = async () => {
        console.log(secondSelectValue)

        setIsModalOpenAttonemy(true)
        setIsModalOpenTwo(false)
    };


    const handleCancelTwo = () => {
        setIsModalOpenTwo(false);
        setIsModalOpen(true)
    };
    // ===== modal two end =====================







    // ====== modal three start ===============
    const handleSelectChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleDateChange = (date, dateString) => {
        setFormData(prev => ({
            ...prev,
            date: dateString
        }));
    };

    const handleTimeChange = (time, timeString) => {
        setFormData(prev => ({
            ...prev,
            time: timeString
        }));
    };


    // const handleDone = () => {
    //     console.log("Selected values:", formData);
    //     handleOkAttonemy();
    // };

    const handleOkAttonemy = async () => {
        console.log("Selected values----------:", formData);

        // try {
        //     const response = await axios.post("url", formData, {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     });

        //     console.log("Server Response:", response.data);
        // } catch (error) {
        //     console.error("Error sending data:", error);
        // }



        setIsModalOpenAttonemy(false)
        navigate('/attorney-tm')
    };


    const handleCancelAttonemy = () => {
        setIsModalOpenAttonemy(false);
        setIsModalOpenTwo(true)
    };
    // ====== modal three end =================


    const bannerImage = [
        {
            image: "/bannerCard/card1.png",
            name: "Immigration",
        },
        {
            image: "/bannerCard/card2.png",
            name: "Wills & Trusts",
        },
        {
            image: "/bannerCard/card3.png",
            name: "Family & Matrimonial",
        },
        {
            image: "/bannerCard/card4.png",
            name: "Trademarks",
        },
        {
            image: "/bannerCard/card5.png",
            name: "Advance Care Planning",
        },
        {
            image: "/bannerCard/card6.png",
            name: "Criminal Defense",
        },
        {
            image: "/bannerCard/card7.png",
            name: "Residential Real Estate",
        },
        {
            image: "/bannerCard/card8.png",
            name: "Business Formation",
        },
        {
            image: "/bannerCard/card9.png",
            name: "Commercial Real Estate",
        },
    ]




    return (
        <div className="bg-[#F5F5F7] container mx-auto px-4 pb-6 md:pb-[36px] lg:pb-[64px]">
            <div className="text-center pt-[60px] lg:pt-[193px] pb-[60px] lg:pb-[297px]">
                <h1 className="text-[48px] md:text-[76px] lg:text-[96px] font-crimson font-semibold text-primary ">LawPair</h1>
                <p className="max-w-[600px] mx-auto h-[73px] text-[#41414D] md:pt-[48px] pb-[104px]">No hassle. No fees. We've streamlined the attorney search process so that you can focus on what matters most.</p>
                {/* <button className="bg-primary py-[20px] px-[40px] text-[#FFFFFF] text-[20px] font-bold rounded">Find your lawyer</button> */}



                <Button onClick={showModal} style={{ width: "228px", height: "64px", backgroundColor: "#1b69ad", color: "#FFFFFF", fontFamily: "Roboto", fontSize: "20px", fontWeight: "bold" }}>
                    Find your lawyer
                </Button>

                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                    width={600}
                    footer={
                        <div className="font-roboto flex justify-center md:justify-between items-center gap-x-4 md:px-7">
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

                            <svg width="100%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                                <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                                <rect x="36" y="19" width="456" height="2" fill="#B6B6BA" />
                                <circle cx="508" cy="20" r="15" stroke="#B6B6BA" strokeWidth="2" />
                            </svg>


                            <Title level={4} className='text-[#000000] font-roboto text-start pb-[8px]'>
                                Select the legal help you need
                            </Title>


                            <Space wrap>
                                {options.map((option) => (
                                    <Button
                                        key={option}
                                        onClick={() => handleSelect(option)}
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
                            </Space>

                        </div>
                    </div>
                </Modal>


                {/* modal two */}

                <Modal open={isModalOpenTow} onOk={handleOkTwo} onCancel={handleCancelTwo}
                    width={600}
                    footer={
                        <div className="flex justify-between items-center gap-x-4 ">
                            <button
                                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                onClick={handleCancelTwo}
                            >
                                Cancel
                            </button>
                            <button
                                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                                onClick={handleOkTwo}
                            >
                                Continue
                            </button>
                        </div>
                    }
                // okText="Continue"
                // cancelText="Back"
                // okButtonProps={{
                //     style: { width: "161px", height: "64px", backgroundColor: "#1b69ad", color: "#FFFFF", borderRadius: "5px", fontSize: "16px", fontWeight: "bold" }, // OK button style
                // }}
                // cancelButtonProps={{
                //     style: { width: "161px", height: "64px", color: "#1b69ad", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", },
                // }}
                >


                    <div>
                        <svg width="90%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                            <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                            <rect x="36" y="19" width="456" height="2" fill="#B6B6BA" />
                            <circle cx="508" cy="20" r="15" stroke="#B6B6BA" strokeWidth="2" />
                        </svg>

                        <div>
                            <Title level={4} className='text-[#000000] font-roboto text-start pb-[8px]'>
                                Location
                            </Title>
                        </div>


                        <div className='pb-4'>
                            <p>Select your location</p>
                            <Select
                                showSearch
                                placeholder="Select..."
                                style={{ width: '100%', height: '40px' }}
                                onChange={value => handleSelectModalTwoValue("location", value)}
                                options={[
                                    { label: "A", value: "a" },
                                    { label: "B", value: "b" },
                                    { label: "C", value: "c" }
                                ]}
                            />
                        </div>

                        <div>
                            <p>City</p>
                            <Select
                                showSearch
                                placeholder="Select..."
                                style={{ width: '100%', height: '40px' }}
                                onChange={value => handleSelectModalTwoValue("city", value)}
                                options={[
                                    { label: "E", value: "e" },
                                    { label: "F", value: "f" },
                                    { label: "G", value: "g" }
                                ]}
                            />
                        </div>
                    </div>

                </Modal>


                {/* modal three */}
                <Modal open={isModalOpenAttonemy} onOk={handleOkAttonemy} onCancel={handleCancelAttonemy}
                    width={600}
                    footer={
                        <div className="flex justify-between items-center gap-x-4 ">
                            <button
                                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                onClick={handleCancelAttonemy}
                            >
                                Cancel
                            </button>
                            <button
                                className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                                onClick={handleOkAttonemy}
                            >
                                Continue
                            </button>
                        </div>
                    }
                // okText="Done"
                // cancelText="Back"
                // okButtonProps={{
                //     style: { width: "161px", height: "64px", backgroundColor: "#1b69ad", color: "#FFFFF", borderRadius: "5px", fontSize: "16px", fontWeight: "bold" }, // OK button style
                // }}
                // cancelButtonProps={{
                //     style: { width: "161px", height: "64px", color: "#1b69ad", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", },
                // }}
                >


                    <div>
                        <svg width="90%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="16" fill="#1B69AD" />
                            <path d="M14.167 20.834L17.5003 24.1673L25.8337 15.834" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="36" y="19" width="456" height="2" fill="#1B69AD" />
                            <circle cx="508" cy="20" r="15" stroke="#1B69AD" stroke-width="2" />
                            <circle cx="508" cy="20" r="5" fill="#1B69AD" />
                        </svg>


                        <div>
                            <Title level={4} className='text-[#000000] font-roboto text-start pb-[8px]'>
                                Find the exact Attorny by filter
                            </Title>
                        </div>


                        <div className='pb-4'>
                            <p>Lawyer experience</p>
                            <Select
                                showSearch
                                placeholder="Select..."
                                style={{ width: '100%', height: '40px' }}
                                onChange={value => handleSelectChange("lawyerExperience", value)}
                                options={[
                                    { label: "1-3 Years", value: "1-3" },
                                    { label: "4-7 Years", value: "4-7" },
                                    { label: "8+ Years", value: "8+" }
                                ]}
                            />
                        </div>

                        <div className='pb-4'>
                            <p>Location</p>
                            <Select
                                showSearch
                                placeholder="Select..."
                                style={{ width: '100%', height: '40px' }}
                                onChange={value => handleSelectChange("location", value)}
                                options={cityOptions}
                            />
                        </div>

                        <div className='pb-4'>
                            <p>Languages</p>
                            <Select
                                showSearch
                                placeholder="Select..."
                                style={{ width: '100%', height: '40px' }}
                                onChange={value => handleSelectChange("languages", value)}
                                options={[
                                    { label: "New York", value: "new-york" },
                                    { label: "Los Angeles", value: "los-angeles" },
                                    { label: "Chicago", value: "chicago" }
                                ]}
                            />
                        </div>

                        <div className='pb-4'>
                            <p>Availability</p>
                            <div className='flex justify-between items-center gap-6'>
                                <DatePicker style={{ width: "50%", height: '40px' }} onChange={handleDateChange} />


                                {/* date picker component*/}
                                <TimePicker style={{ width: "50%", height: '40px' }} onChange={handleTimeChange} />
                            </div>
                        </div>
                    </div>

                </Modal>

            </div>
            <div>
                <div className="max-w-[695px] mx-auto text-center text-wrap pb-[36px]">
                    <h1 className="font-roboto font-bold text-[24px] md:text-[32px]">Find the Legal Help You Need</h1>
                    <p className="text-[#60606A] font-roboto font-normal text-[20px] md:text-[24px] pt-[12px]">Finding the right legal support has never been easier. Select up to 3 practice areas to find your LawPair Suggested (TM) attorney today</p>
                </div>

                {/* banner curd */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 place-items-center gap-3">
                        {
                            bannerImage?.map((item, index) => {
                                return (
                                    <div key={index} className="bg-[#FFFFFF] w-full h-full lg:w-[240px] lg:h-[136px] flex flex-col justify-center items-center p-3 hover:bg-primary hover:text-white">
                                        <img src={item.image} alt="banner image" className="pb-[8px]" />
                                        <h4 className="text-[18px] font-normal font-roboto text-center">{item.name}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner