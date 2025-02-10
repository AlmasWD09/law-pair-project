import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";

const AttorneyTm = () => {
    const attorneyData = [
        {
            "id": 1,
            "image": "/attorney1.png",
            "name": "John Doe",
            "title": "Software Engineer"
        },
        {
            "id": 2,
            "image": "/attorney1.png",
            "name": "Jane Smith",
            "title": "Product Manager"
        },
        {
            "id": 3,
            "image": "/attorney1.png",
            "name": "Alice Johnson",
            "title": "UI/UX Designer"
        },
        {
            "id": 4,
            "image": "/attorney1.png",
            "name": "Michael Brown",
            "title": "Data Scientist"
        },
        {
            "id": 5,
            "image": "/attorney1.png",
            "name": "Emily Davis",
            "title": "Marketing Specialist"
        },
        {
            "id": 6,
            "image": "/attorney1.png",
            "name": "David Wilson",
            "title": "Cybersecurity Analyst"
        }
    ];



    return (
        <div className="container mx-auto px-4 py-20">
            <div>
                <span><FaArrowLeft className="text-[20px] text-[#60606A]" /></span>
                <div className="flex items-center gap-3 pt-10">
                    <Link to={'/'}>
                        <span className="flex items-center gap-1 font-roboto text-[14px] text-[#60606A]"><FaHome /> Home</span>
                    </Link>
                    /
                    <span className="font-roboto text-[14px] text-[#60606A] ">Find your attorney</span>
                    /
                    <span className="font-roboto text-[14px] text-[#10101E] font-bold">attorney</span>
                </div>
                <h3 className="font-roboto text-[16px] text-[#121221] py-[26px]">LawPair suggested attorneys TM</h3>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                    {
                        attorneyData.map((attorney, index) => {
                            return (
                                <Link to={`/attorney-tm-details/${attorney.id}`} key={index}>
                                    <div  className="w-[300px] h-[378px] p-4 shadow-lg rounded-md">
                                        <img src={attorney.image} alt="attorney" className="w-full" />
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px]">{attorney.name}</h2>
                                            <span><FaRegCheckCircle /></span>
                                        </div>

                                        <h3 className="text-[14px] font-roboto text-[#001018]">{attorney.title}</h3>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AttorneyTm