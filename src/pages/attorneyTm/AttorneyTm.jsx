import { FaArrowLeft, FaHome } from "react-icons/fa";

const AttorneyTm = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div>
                <span><FaArrowLeft className="text-[28px] text-[#60606A]"/></span>
                <div className="flex items-center gap-3 pt-10">
                    <span className="flex items-center gap-1 font-roboto text-[14px] text-[#60606A]"><FaHome /> Home</span>
                    /
                    <span className="font-roboto text-[14px] text-[#60606A] ">Find your attorney</span>
                    /
                    <span className="font-roboto text-[14px] text-[#10101E] ">attorney</span>
                </div>
            </div>

        </div>
    )
}

export default AttorneyTm