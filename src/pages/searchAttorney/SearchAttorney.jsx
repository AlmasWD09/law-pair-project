import { useLocation } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate";
import { FaRegCheckCircle } from "react-icons/fa";


const SearchAttorney = () => {
    const location = useLocation();
    const searchResults = location.state?.searchResults;



    return (
        <AccountCreate>
            <div className="container mx-auto px-4">
                {/* <h1>searchAttorney</h1> */}


                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6 md:gap-2 lg:gap-6">
                        {
                            searchResults?.map((attorney, index) => {
                                return (
                                    <div key={index} className="w-[300px] h-[378px] p-4 shadow-lg rounded-md">
                                        <img src='/attorney1.png' alt="attorney" className="w-full" />
                                        {/* <img src={attorney.avatar}  alt="attorney" className="w-full" /> */}
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px]">{attorney.full_name}</h2>
                                            <span><FaRegCheckCircle /></span>
                                        </div>

                                        <h3 className="text-[14px] font-roboto text-[#001018]">{attorney.state}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </AccountCreate>
    )
}

export default SearchAttorney