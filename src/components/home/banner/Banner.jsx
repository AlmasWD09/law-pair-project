
import { useState } from 'react';
import { Button, Typography, Space, Modal } from "antd";

const { Title } = Typography;

const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);


    const showModal = () => {
        setIsModalOpen(true);
    };


const handleOk = async () => {
    if (selectedOptions.length === 0) {
        console.log("No options selected.");
        return;
    }
console.log(selectedOptions)
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

                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                    width={600}
                    okText="Continue"
                    okButtonProps={{
                        style: { width:"161px",height:"64px", backgroundColor: "#1b69ad", color: "#FFFFF", borderRadius: "5px", fontSize:"16px", fontWeight:"bold" }, // OK button style
                    }}
                    cancelButtonProps={{
                        style: { width:"161px",height:"64px",  color: "#1b69ad", borderRadius: "5px",fontSize:"16px", fontWeight:"bold", },
                    }}
                >


                    <div>
                        <div style={{ maxWidth: "100%", margin: "auto", textAlign: "center" }} >
                            {/* Progress Bar (Placeholder) */}
                            <div style={{ width: "100%", height: 5, background: "#e0e0e0", borderRadius: 10, marginBottom: 20 }}>

                                <div style={{ width: "10%", height: "100%", background: "#0047ab", borderRadius: 10 }} />
                            </div>

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
                                            fontWeight:"bold",
                                            fontSize:"16px",
                                            fontFamily:"Roboto",
                                            padding:"20px"
                                        }}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </Space>

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
                                    <div key={index} className="bg-[#FFFFFF] w-full h-full lg:w-[240px] lg:h-[136px] flex flex-col justify-center items-center p-3">
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