
import { useEffect, useState } from 'react';
import { Button, Typography, Space, Modal, Select, TimePicker, DatePicker, Input, Upload } from "antd";
const { Title } = Typography;


import { CheckCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import Cookies from "js-cookie";


const Banner = () => {
    const [categorieData, setCategorieData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTow, setIsModalOpenTwo] = useState(false);
    const [isModalOpenThree, setIsModalOpenThree] = useState(false);
    const [timeValue, setTimeValue] = useState(null)
    const [webLink, setWebLink] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([]); // server-data post request 


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
        time: null,
    });
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const [fileList, setFileList] = useState([])

    const [modalOneValue, setModalOneValue] = useState([])






    const [lawyerModalOpenTwo, setLawyerModalOpenTwo] = useState(false)
    const [lawyerModalOpenThree, setLawyerModalOpenThree] = useState(false)
    const [selectedLowyerOptions, setSelectedLowyerOptions] = useState([]);
    const lowyerOptions = ["Monday", "Tuesday", "Wednesday", "Thursday"];
    const [lowyerSelectValue, setLowyerSelectValue] = useState({
        experience: null,
        language: null,
    })
    const [selectDay, setSelectDay] = useState(null)


    // categorie modal
    const [categorieModalOpen, setCategorieModalOpen] = useState(false);
    const [categorieSecondModalOpen, setCategorieSecondModalOpen] = useState(false);
    const [categorieName, setCategorieName] = useState('')
    const [categorieSelectValue, setCategorieSelecteValue] = useState({
        location: null,
        city: null,
    })
    // const [categorieSecondSelectValue, setCategorieSecondSelecteValue] = useState({
    //     lawyerExperience: null,
    //     location: null,
    //     languages: null,
    //     time: null,
    // });


    // first modal option get server

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



    const handleChange = ({ fileList }) => setFileList(fileList);


    const handleSelectLowyer = (option) => {
        console.log(option)
        setSelectedLowyerOptions((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
    };


    //====================== first modal start ==============
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setModalOneValue(selectedOptions)
        if (selectedOptions.length === 0) {
            console.log("No options selected.");
            return;
        }

        if (role === "user") {
            setIsModalOpen(false)
            setSelectedOptions([])
            setIsModalOpenTwo(true)
        }
        else {
            setIsModalOpen(false)
            setSelectedOptions([])
            setLawyerModalOpenTwo(true)
        }


        // try {
        //     const response = await axios.post('url', {
        //         selectedOptions: selectedOptions,
        //     });

        //     console.log("Server Response:", response.data);
        //     if (response.data.success) {
        //         setIsModalOpen(false)
        //         setSelectedOptions("")
        //         setIsModalOpenTwo(true)
        //     }
        //     else {
        //         toast.error('please try again! and selected data MODAL ONE')
        //     }
        // } catch (error) {
        //     toast.error("Error sending data to the server:", error);
        // }
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













    // ===== user modal two start ===============
    useEffect(() => {
    }, [selectedOptions]);


    // Select Value Change Function
    const handleSelectModalTwoValue = (key, value) => {
        setSecondSelecteValue(prev => ({
            ...prev,
            [key]: value
        }))
    }


    const handleOkTwo = async () => {
        const userInfo = {
            service_ids: modalOneValue,
            state: secondSelectValue.location,
            language: secondSelectValue.city
        }
        // try {
        //     const response = await axiosPublic.get(`/find-lawyers?service_ids=${JSON.stringify(userInfo.service_ids)}&state=${userInfo.state}&language=${userInfo.language}`,);
        //     console.log("Server Response:", response.data);

        //     if (response.data.success) {
        //         setIsModalOpenTwo(false);
        //         navigate('/attorney-tm')

        //     } else {
        //         toast.error('Please try again! Something is wrong');
        //     }
        // } catch (error) {
        //     toast.error("Failed! Error sending data to the server:",);
        // }
        setIsModalOpenThree(true)
        setIsModalOpenTwo(false)
    };


    const handleCancelTwo = () => {
        setIsModalOpenTwo(false);
        setIsModalOpen(true)
    };
    // ===== modal two end =====================







    // ====== user modal three start ===============
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

    const handleOkAttonemy = async () => {
        console.log('modal---one--value------>', modalOneValue)
        console.log('modal---two--value------>', secondSelectValue)
        console.log('modal---three--value------>', formData)


        try {
            const response = await axiosPublic.post("url", formData);

            console.log("Server Response:", response.data);
        } catch (error) {
            console.error("Error sending data:", error);
        }

        setIsModalOpenThree(false)
        navigate('/attorney-tm')
    };


    const handleCancelAttonemy = () => {
        setIsModalOpenThree(false);
        setIsModalOpenTwo(true)
    };
    // ====== user modal three end =================























    //================= lowyer modal two start ==============

    // Select Value Change Function
    const handleSelectModalLowyerTwoValue = (key, value) => {
        setLowyerSelectValue(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleSelectModalLowyerTwoValue(name, value);
    };

    const handleOkLowyerTwo = async () => {

        // console.log('modal two layer vallue', lowyerSelectValue)


        // try {
        //     const response = await axios.post('url',lowyerSelectValue);

        //     console.log("Server Response:", response.data);
        //     if (response.data.success) {
        //         setLawyerModalOpenTwo(false)
        //         setLawyerModalOpenTwo('')
        //         setLawyerModalOpenThree(true)
        //     }
        //     else {
        //         toast.error('please try again! and selected data MODAL TWO')
        //     }
        // } catch (error) {
        //     toast.error("Error sending data to the server:", error);
        // }

        setLawyerModalOpenTwo(false)
        setLawyerModalOpenTwo('')
        setLawyerModalOpenThree(true)
    }


    const handleCancelLowyerTwo = () => {
        setLawyerModalOpenTwo(false)
        setIsModalOpen(true)
    }
    //================= lowyer modal two end ================



    //================= lowyer modal three start ==============
    const handleTimeChangeLowyerModal = (time, timeString) => {
        setFormData(prev => ({
            ...prev,
            time: timeString
        }));
    };


    const token = Cookies.get("lawyerToken");

    const handleOkLowyerThree = async () => {
        // console.log(timeValue.time)
        // console.log(sel)
        // console.log(webLink)


        navigate('/lawyer-profile')


        const schedule = [
            {
                day: selectDay,
                time: timeValue.time,

            }
        ]

        const formData = new FormData();

        if (fileList && fileList.length > 0) {
            formData.append("avatar", fileList[0].originFileObj);
        }
        formData.append('service_ids', modalOneValue)
        formData.append('practice_area', lowyerSelectValue.practice)
        formData.append('experience', lowyerSelectValue.experience)
        formData.append('languages', lowyerSelectValue.language)
        formData.append('state', lowyerSelectValue.state)
        formData.append('address', lowyerSelectValue.address)
        formData.append('phone', lowyerSelectValue.mobile)
        // formData.append('zipCode', lowyerSelectValue.zipCode) /// post-------->

        formData.append('web_link', webLink)
        formData.append('schedule', JSON.stringify(schedule));


        formData.forEach((value, key) => {
            console.log(key, value);
        });


        // try {
        //     const response = await axiosPublic.post('/lawyer/update-profile', formData,{
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Accept": "application/json"
        //             // ✅ Send token in Authorization header
        //         }

        //     });

        //     console.log("Server Response:", response.data);

        // } catch (error) {
        //     toast.error("Error sending data to the server:", error);
        // }



    }

    const handleCancelLowyerThree = () => {
        setLawyerModalOpenThree(false)
        setLawyerModalOpenTwo(true)
    }
    //================= lowyer modal three start ================







    //=============== categorie first modal start ===============
    const showModalCategorie = () => {
        setCategorieModalOpen(true);
    };

    // categorie select value
    const handleSeleCtcategorieValue = (key, value) => {
        setCategorieSelecteValue(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleCategorieOk = async () => {

        const findLawyerInfo = {
            service_ids: [categorieName],  // Ensure it's an array
            state: categorieSelectValue.location,
            language: categorieSelectValue.city
        };

        try {
            const response = await axiosPublic.get(`/find-lawyers`, {
                params: {
                    service_ids: JSON.stringify(findLawyerInfo.service_ids), // Ensure it's a JSON array
                    state: findLawyerInfo.state,
                    language: findLawyerInfo.language
                }
            });

            console.log(response.data?.lawyers?.data)

            if (response.data.success) {
                navigate('/attorney-tm', { state: { lawyers: response.data?.lawyers?.data } })
            }
            else {
                toast.error('No lawyer found!')
            }
        } catch (error) {
            setCategorieModalOpen(false);
            toast.error('No lawyer found!')
        } finally {
            setCategorieModalOpen(false);
        }
    }


    const handleCancelCategorie = () => {
        setCategorieModalOpen(false);

    }

    //=============== categorie first modal end =================









    //=============== categorie second modal start ===============
    // const handleTimeChangeSecondCategorieModal = (time, timeString) => {
    //     setCategorieSecondSelecteValue(prev => ({
    //         ...prev,
    //         time: timeString
    //     }));
    // };


    // const handleSeleSecondCtcategorieValue = (key, value) => {
    //     setCategorieSecondSelecteValue(prev => ({
    //         ...prev,
    //         [key]: value
    //     }))
    // }

    // const handleOkCategorieTwo = () => {
    // console.log(categorieName)
    // console.log(categorieSelectValue)
    //     console.log(categorieSecondSelectValue)
    //     navigate('/attorney-tm')
    // }

    // const handleCancelCategorieTwo = () => {
    //     setCategorieSecondModalOpen(false)
    //     setCategorieModalOpen(true)
    // }
    //=============== categorie second modal end =================


    const role = "user"

    const handleCateogrie = (name) => {
        setCategorieName(name)
    }


    useEffect(() => {
        // Disable scroll when any modal is open
        if (isModalOpen || isModalOpenTow || isModalOpenThree || categorieModalOpen || categorieSecondModalOpen || lawyerModalOpenTwo || lawyerModalOpenThree || categorieModalOpen || categorieSecondModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            // Re-enable scroll when no modal is open
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto"; // Cleanup function
        };
    }, [isModalOpen, isModalOpenTow, isModalOpenThree, lawyerModalOpenTwo, lawyerModalOpenThree, categorieModalOpen, categorieSecondModalOpen]);



    useEffect(() => {
        if (categorieModalOpen || categorieSecondModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; // Cleanup function
        };
    }, [categorieModalOpen, categorieSecondModalOpen]);



    return (
        <div className="bg-[#F5F5F7] container mx-auto px-2 md:px-4 pb-6 md:pb-[36px] lg:pb-[64px]">
            <div className="text-center pt-[60px] lg:pt-[193px] pb-[60px] lg:pb-[297px]">
                {/* <h1 className="text-[48px] md:text-[76px] lg:text-[96px] font-crimson font-semibold text-primary ">LawPair</h1> */}
                <div className='flex justify-center items-center pb-6 md:pb-10'>
                    <img src="/logo4.png" alt="logo" className='' />
                </div>
                {/* <p className="max-w-[600px] mx-auto font-roboto font-normal h-[73px] text-[#41414D] md:pt-[48px] pb-[104px] leading-[28px]">No hassle. No fees. We've streamlined the attorney search process so that <br /> you can focus on what matters most.</p> */}


                <Button onClick={showModal} style={{ width: "298px", height: "55px", backgroundColor: "#b9d4eb", fontFamily: "Roboto", fontSize: "20px", fontWeight: "bold", }} className='no-hover'>
                    Click here to find your lawyer
                </Button>

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



                {/* modal two */}
                {
                    role === 'user' ? <Modal centered open={isModalOpenTow} onOk={handleOkTwo} onCancel={handleCancelTwo}
                        width={600}
                        footer={
                            <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                                <button
                                    className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                    onClick={handleCancelTwo}
                                >
                                    Back
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
                            <svg className='mb-4' width="90%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                                <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                                <rect x="36" y="19" width="456" height="2" fill="#B6B6BA" />
                                <circle cx="508" cy="20" r="15" stroke="#B6B6BA" strokeWidth="2" />
                            </svg>

                            <hr />

                            <div className='pt-4'>
                                <Title level={4} className='text-[14px] font-roboto font-bold text-[#001018]'>
                                    Location
                                </Title>
                            </div>


                            <div className='pb-4'>
                                <p className='text-[14px] font-roboto font-bold text-[#001018]'>Select your location</p>
                                <Select
                                    showSearch
                                    placeholder="Select..."
                                    style={{ width: '100%', height: '40px' }}
                                    onChange={value => handleSelectModalTwoValue("location", value)}
                                    options={[
                                        { value: 'New Jersey', label: 'New Jersey' },
                                        { value: 'New York', label: 'New York' },
                                        { value: 'Pennsylvania', label: 'Pennsylvania' },
                                        { value: 'Washington, D.C', label: 'Washington, D.C' },
                                    ]}
                                />
                            </div>

                            <div>
                                <p className='text-[14px] font-roboto font-bold text-[#001018]'>City</p>
                                <Select
                                    showSearch
                                    placeholder="Select..."
                                    style={{ width: '100%', height: '40px' }}
                                    onChange={value => handleSelectModalTwoValue("city", value)}
                                    options={[
                                        { label: "English", value: "English" },
                                        { label: "Spanish", value: "Spanish" },
                                        { label: "German", value: "German" },
                                        { label: "Russian", value: "Russian" }
                                    ]}
                                />
                            </div>
                        </div>

                    </Modal>
                        :
                        <Modal centered open={lawyerModalOpenTwo} onOk={handleOkLowyerTwo} onCancel={handleCancelLowyerTwo}
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
                }



                {/* modal three */}
                {
                    role === "user" ? <Modal centered open={isModalOpenThree} onOk={handleOkAttonemy} onCancel={handleCancelAttonemy}
                        width={600}
                        footer={
                            <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                                <button
                                    className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                    onClick={handleCancelAttonemy}
                                >
                                    Back
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
                            <svg
                                className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
                                width="90%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="16" fill="#1B69AD" />
                                <path d="M14.167 20.834L17.5003 24.1673L25.8337 15.834" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="36" y="19" width="456" height="2" fill="#1B69AD" />
                                <circle cx="508" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                                <circle cx="508" cy="20" r="5" fill="#1B69AD" />
                            </svg>

                            <hr />
                            <div className='pt-4'>
                                <Title level={4} className='text-[14px] font-roboto font-bold text-[#001018]'>
                                    Find the exact Attorny by filter
                                </Title>
                            </div>


                            <div className='pb-4'>
                                <p className='text-[14px] font-roboto font-bold text-[#001018]'>Lawyer experience</p>
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
                                <p className='text-[14px] font-roboto font-bold text-[#001018]'>Location</p>
                                <Select
                                    showSearch
                                    placeholder="Select..."
                                    style={{ width: '100%', height: '40px' }}
                                    onChange={value => handleSelectChange("location", value)}
                                    options={[
                                        { label: "New York", value: "new-york" },
                                        { label: "Los Angeles", value: "los-angeles" },
                                        { label: "Chicago", value: "chicago" }
                                    ]}

                                />
                            </div>

                            <div className='pb-4'>
                                <p className='text-[14px] font-roboto font-bold text-[#001018]'>Languages</p>
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
                                <div className='flex justify-between items-center gap-6 pb-4'>
                                    {/* <div className='w-full'>
                                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                                            <DatePicker style={{ width: "100%", height: '40px' }} onChange={handleDateChangeLowyerModal} />
                                        </div> */}

                                    <div className='w-full'>
                                        <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                                        <Space wrap>
                                            <Select
                                                defaultValue="Select day.."
                                                style={{ width: 150 }}
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
                                        </Space>
                                    </div>


                                    <div className='w-full'>
                                        {/* date picker component*/}
                                        <p className='text-[14px] font-roboto font-bold text-primary text-end'>Add new</p>
                                        <TimePicker style={{ width: "100%", height: '40px' }} onChange={handleTimeChangeLowyerModal} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>

                        :
                        <Modal centered open={lawyerModalOpenThree} onOk={handleOkLowyerThree} onCancel={handleCancelLowyerThree}
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


                                {/* upload image */}
                                <div className="pb-4 w-full">
                                    <p className="text-[14px] font-roboto font-bold text-[#001018]">Upload profile photo</p>
                                    <div className="w-full">
                                        <Upload
                                            fileList={fileList}
                                            onChange={handleChange}
                                            beforeUpload={() => false} // Prevent auto-upload
                                            style={{ width: '100%', height: '40px' }} // Force the Upload component to take full width
                                            className="upload-component" // Custom class to apply further styling
                                        >
                                            {fileList.length >= 1 ? null : (
                                                <Button
                                                    icon={<UploadOutlined />}
                                                    style={{ width: '100%', height: '40px' }} // Ensure the button takes up full width
                                                >
                                                    Upload Image
                                                </Button>
                                            )}
                                        </Upload>
                                    </div>
                                </div>




                                <div className='pb-4'>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>Website link (optional)</p>
                                    <Input name='webLink' placeholder='Include a link to your website here' style={{ width: '100%', height: '40px' }} />
                                </div>


                                <div className='pb-4'>
                                    <div className='flex justify-between items-center gap-6 pb-4'>
                                        {/* <div className='w-full'>
                                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                                            <DatePicker style={{ width: "100%", height: '40px' }} onChange={handleDateChangeLowyerModal} />
                                        </div> */}

                                        <div className='w-full'>
                                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                                            <Space wrap>
                                                <Select
                                                    defaultValue="Select day.."
                                                    style={{ width: 150 }}

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
                                            </Space>
                                        </div>


                                        <div className='w-full'>
                                            {/* date picker component*/}
                                            <p className='text-[14px] font-roboto font-bold text-primary text-end'>Add new</p>
                                            <TimePicker style={{ width: "100%", height: '40px' }} onChange={handleTimeChangeLowyerModal} />
                                        </div>
                                    </div>
                                </div>


                                <div className='pb-4'>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>Preview</p>
                                    <Space wrap>
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
                                    </Space>
                                </div>
                                <div className='flex flex-col md:flex-row gap-[12px]'>
                                    <p className='font-roboto text-[14px] text-[#121221]'>11:30-12:30 pm</p>
                                    <p className='font-roboto text-[14px] text-[#121221]'>11:30-12:30 pm</p>
                                    <p className='font-roboto text-[14px] text-[#121221]'>11:30-12:30 pm</p>
                                </div>
                            </div>

                        </Modal>
                }


            </div>
            <div>
                <div className="max-w-[695px] mx-auto text-center text-wrap pb-[36px]">
                    <h1 className="font-roboto font-bold text-[24px] md:text-[32px] textpri">Find the Legal Help You Need</h1>
                    <p className="text-[#60606A] font-roboto font-normal text-[20px] md:text-[24px] pt-[12px] leading-[35px]">Finding the right legal support has never been easier. Select up to 3 practice areas to find your LawPair Suggested <sup>(TM)</sup> attorney today</p>
                </div>




                {/* banner curd */}
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-3">
                        {
                            categorieData?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer bg-[#FFFFFF] min-w-[280px] md:min-w-[300px] lg:min-w-[510px] min-h-[150px] md:min-h-[180px] lg:min-h-[204px] flex flex-col justify-center items-center p-3 rounded-[24px] hover:bg-primary hover:opacity-85 group overflow-hidden"
                                        onClick={() => (handleCateogrie(item.id), showModalCategorie())}
                                    >

                                        <div className='flex flex-col justify-center items-center'>
                                            <img
                                                src={item.image_icon}
                                                alt="default image"
                                                className="pb-[8px] transition-opacity duration-300 ease-in-out"
                                            />
                                            <h4 className="text-[18px] font-semibold md:font-bold font-roboto text-center">
                                                {item.name}
                                            </h4>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {/* categorie for first modal */}
                        <Modal centered open={categorieModalOpen} onOk={handleCategorieOk} onCancel={handleCancelCategorie}
                            width={600}
                            footer={
                                <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                                    <button
                                        className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                        onClick={handleCancelCategorie}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                                        onClick={handleCategorieOk}
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
                                <svg className='mb-4' width="90%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                                    <circle cx="20" cy="20" r="5" fill="#1B69AD" />
                                    <rect x="36" y="19" width="456" height="2" fill="#B6B6BA" />
                                    <circle cx="508" cy="20" r="15" stroke="#B6B6BA" strokeWidth="2" />
                                </svg>

                                <hr />

                                <div className='pt-4'>
                                    <Title level={4} className='text-[14px] font-roboto font-bold text-[#001018]'>
                                        Location
                                    </Title>
                                </div>


                                <div className='pb-4'>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>Select your location</p>
                                    <Select
                                        showSearch
                                        placeholder="Select..."
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={value => handleSeleCtcategorieValue("location", value)}
                                        options={[
                                            { value: 'new jersey', label: 'New Jersey' },
                                            { value: 'new york', label: 'New York' },
                                            { value: 'pennsylvania', label: 'Pennsylvania' },
                                            { value: 'washington, d.c', label: 'Washington, D.C' },
                                        ]}
                                    />
                                </div>

                                <div>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>City</p>
                                    <Select
                                        showSearch
                                        placeholder="Select..."
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={value => handleSeleCtcategorieValue("city", value)}
                                        options={[
                                            { label: "English", value: "english" },
                                            { label: "Spanish", value: "spanish" },
                                            { label: "German", value: "german" },
                                            { label: "Russian", value: "russian" }
                                        ]}
                                    />
                                </div>
                            </div>

                        </Modal>

                        {/* categorie for second modal */}
                        {/* <Modal centered open={categorieSecondModalOpen} onOk={handleOkCategorieTwo} onCancel={handleCancelCategorieTwo}
                            width={600}
                            footer={
                                <div className="flex justify-between items-center gap-x-4 pt-[24px]">
                                    <button
                                        className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                        onClick={handleCancelCategorieTwo}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                                        onClick={handleOkCategorieTwo}
                                    >
                                        Continue
                                    </button>
                                </div>
                            }
                        >


                            <div>
                                <svg
                                    className="mb-4 w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%]"
                                    width="90%" height="40" viewBox="0 0 528 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="16" fill="#1B69AD" />
                                    <path d="M14.167 20.834L17.5003 24.1673L25.8337 15.834" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="36" y="19" width="456" height="2" fill="#1B69AD" />
                                    <circle cx="508" cy="20" r="15" stroke="#1B69AD" strokeWidth="2" />
                                    <circle cx="508" cy="20" r="5" fill="#1B69AD" />
                                </svg>

                                <hr />
                                <div className='pt-4'>
                                    <Title level={4} className='text-[14px] font-roboto font-bold text-[#001018]'>
                                        Find the exact Attorny by filter
                                    </Title>
                                </div>


                                <div className='pb-4'>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>Lawyer experience</p>
                                    <Select
                                        showSearch
                                        placeholder="Select..."
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={value => handleSeleSecondCtcategorieValue("lawyerExperience", value)}
                                        options={[
                                            { label: "1-3 Years", value: "1-3 Years" },
                                            { label: "4-7 Years", value: "4-7 Years" },
                                            { label: "8+ Years", value: "8+ Years" }
                                        ]}
                                    />
                                </div>

                                <div className='pb-4'>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>Location</p>
                                    <Select
                                        showSearch
                                        placeholder="Select..."
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={value => handleSeleSecondCtcategorieValue("location", value)}
                                        options={[
                                            { label: "New York", value: "new-york" },
                                            { label: "Los Angeles", value: "los-angeles" },
                                            { label: "Chicago", value: "chicago" }
                                        ]}

                                    />
                                </div>

                                <div className='pb-4'>
                                    <p className='text-[14px] font-roboto font-bold text-[#001018]'>Languages</p>
                                    <Select
                                        showSearch
                                        placeholder="Select..."
                                        style={{ width: '100%', height: '40px' }}
                                        onChange={value => handleSeleSecondCtcategorieValue("languages", value)}
                                        options={[
                                            { label: "English", value: "English" },
                                            { label: "Spanish", value: "Spanish" },
                                            { label: "German", value: "German" },
                                            { label: "Russian", value: "Russian" }
                                        ]}
                                    />
                                </div>

                                <div className='pb-4'>
                                    <div className='flex justify-between items-center gap-6 pb-4'>
                                        <div className='w-full'>
                                            <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                                            <Space wrap>
                                                <Select
                                                    defaultValue="Select day.."
                                                    style={{ width: 150 }}
                                                    onChange={value => handleSeleSecondCtcategorieValue("availability", value)}
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
                                            </Space>
                                        </div>


                                        <div className='w-full'>
                                            <p className='text-[14px] font-roboto font-bold text-primary text-end'>Add new</p>
                                            <TimePicker style={{ width: "100%", height: '40px' }} onChange={handleTimeChangeSecondCategorieModal} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner