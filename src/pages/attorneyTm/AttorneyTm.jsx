
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { Pagination } from "antd";
import { useState } from "react";

const AttorneyTm = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items per page

    const attorneyData = [
        { "id": 1, "image": "/attorney1.png", "name": "John Doe", "title": "Software Engineer" },
        { "id": 2, "image": "/attorney3.png", "name": "Jane Smith", "title": "Product Manager" },
        { "id": 3, "image": "/attorney1.png", "name": "Alice Johnson", "title": "UI/UX Designer" },
        { "id": 4, "image": "/attorney1.png", "name": "Michael Brown", "title": "Data Scientist" },
        { "id": 5, "image": "/attorney3.png", "name": "Emily Davis", "title": "Marketing Specialist" },
        { "id": 6, "image": "/attorney1.png", "name": "David Wilson", "title": "Cybersecurity Analyst" },
        { "id": 7, "image": "/attorney1.png", "name": "John Doe", "title": "Disital Marketar" },
        { "id": 8, "image": "/attorney3.png", "name": "Jane Smith", "title": "Web developer" },
        { "id": 9, "image": "/attorney1.png", "name": "Alice Johnson", "title": "Product manager" },
        { "id": 10, "image": "/attorney1.png", "name": "Michael Brown", "title": "Data Entry" },
        { "id": 11, "image": "/attorney3.png", "name": "Emily Davis", "title": "Backend Developer" },
        { "id": 12, "image": "/attorney1.png", "name": "David Wilson", "title": "Block chain" },
    ];

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Slice data based on current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = attorneyData.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto px-4 py-8 md:py-20">
            <div className="max-w-[1037px] mx-auto">
                <span><FaArrowLeft onClick={() => navigate(-1)} className="text-[20px] text-[#60606A] cursor-pointer" /></span>
                <div className="flex items-center justify-center gap-3 pt-10">
                    <Link to={'/'}>
                        <span className="flex items-center gap-1 font-roboto text-[14px] text-[#60606A]">
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.16669 13.7643C3.16669 14.1325 3.46516 14.4309 3.83335 14.4309H13.1667C13.5349 14.4309 13.8334 14.1325 13.8334 13.7643V7.76427H15.8334L8.94869 1.5056C8.69434 1.27417 8.3057 1.27417 8.05135 1.5056L1.16669 7.76427H3.16669V13.7643ZM12.5 6.53562V13.0976H4.50002V6.53562L8.50002 2.89962L12.5 6.53562Z" fill="#60606A" />
                            </svg>
                            Home
                        </span>
                    </Link>
                    /
                    <span className="font-roboto text-[14px] text-[#60606A]">Find your attorney</span>
                    /
                    <span className="font-roboto text-[14px] text-[#10101E] font-bold">attorney</span>
                </div>
                <h3 className="font-roboto text-[16px] text-[#121221] py-[26px]">LawPair suggested attorneys TM</h3>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                    {paginatedData.map((attorney) => (
                        <Link to={`/attorney-tm-details/${attorney.id}`} key={attorney.id}>
                            <div className="w-[300px] h-[378px] p-4 shadow-lg rounded-md">
                                <img src={attorney.image} alt="attorney" className="w-full" />
                                <div className="flex justify-between items-center">
                                    <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px]">{attorney.name}</h2>
                                    <span><FaRegCheckCircle /></span>
                                </div>
                                <h3 className="text-[14px] font-roboto text-[#001018]">{attorney.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="py-8">
                <Pagination
                    current={currentPage}
                    total={attorneyData.length}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    align="center"
                />
            </div>
        </div>
    );
};

export default AttorneyTm;
