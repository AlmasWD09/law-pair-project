
import { useEffect, useState } from 'react';
import { Button, Typography, Space, Modal, Select, } from "antd";
const { Title } = Typography;
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';



const Banner = () => {
    const [categorieData, setCategorieData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTow, setIsModalOpenTwo] = useState(false);
    const [isModalOpenThree, setIsModalOpenThree] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);


    const [secondSelectValue, setSecondSelecteValue] = useState({
        location: null,
        city: null,
    })
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const [modalOneValue, setModalOneValue] = useState([])
    const [lawyerModalOpenTwo, setLawyerModalOpenTwo] = useState(false)
    const [lawyerModalOpenThree, setLawyerModalOpenThree] = useState(false)
    // categorie modal
    const [categorieModalOpen, setCategorieModalOpen] = useState(false);
    const [categorieSecondModalOpen, setCategorieSecondModalOpen] = useState(false);
    const [categorieName, setCategorieName] = useState('')
    const [categorieSelectValue, setCategorieSelecteValue] = useState({
        location: null,
        city: null,
    })


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
        const findLawyerInfo = {
            service_ids: modalOneValue,
            state: secondSelectValue.location,
            language: secondSelectValue.city
        };

        try {
            const response = await axiosPublic.get(`/find-lawyers`, {
                params: {
                    service_ids: JSON.stringify(findLawyerInfo.service_ids),
                    state: findLawyerInfo.state,
                    language: findLawyerInfo.language
                }
            });

            if (response.data.success) {
                navigate('/attorney-tm', { state: { lawyers: response.data?.lawyers?.data } })
            }
            else {
                toast.error('No lawyer found!')
            }
        } catch (error) {
            setIsModalOpenTwo(false)
            toast.error('No lawyer found!')
        } finally {
            setIsModalOpenTwo(false)
        }
    };


    const handleCancelTwo = () => {
        setIsModalOpenTwo(false);
        setIsModalOpen(true)
    };
    // ===== modal two end =====================


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
                <div className='flex justify-center items-center pb-6 md:pb-10'>
                    <img src="/logo4.png" alt="logo" className='' />
                </div>

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

                <Modal centered open={isModalOpenTow} onOk={handleOkTwo} onCancel={handleCancelTwo}
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

            </div>
            <div>
                <div className="max-w-[695px] mx-auto text-center text-wrap pb-[36px]">
                    <h1 className="font-roboto font-bold text-[24px] md:text-[32px] textpri">Find the Legal Help You Need</h1>
                    <p className="text-[#60606A] font-roboto font-normal text-[20px] md:text-[24px] pt-[12px] leading-[35px]">Finding the right legal support has never been easier. Select up to 3 practice areas to find your LawPair Suggested <sup>(TM)</sup> attorney today</p>
                </div>
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
                            }>


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
                                            { value: 'new jersey', label: 'new jersey' },
                                            { value: 'new york', label: 'new york' },
                                            { value: 'pennsylvania', label: 'pennsylvania' },
                                            { value: 'washington, d.c', label: 'washington, d.c' },
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner