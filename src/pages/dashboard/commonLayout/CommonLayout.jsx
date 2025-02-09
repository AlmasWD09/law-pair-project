import { FaRegEye, FaUserGroup } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import Chart from "../charts/Chart";

const CommonLayout = () => {
    return (
        <div>
            <div className="bg-[#FFFFFF] p-4 rounded-lg">
                <div className="pb-[24px]">
                    <h2 className="font-roboto text-[16px] text-[#41414D]">Overview</h2>
                    <p className="text-[12px] font-roboto text-[#929299]">Activities summary at a glance</p>
                </div>

                {/* main div here */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 ">
                    {/* one */}
                    <div className="md:w-[336px] h-[151px] p-5 border rounded-lg">
                        <div className="flex items-center gap-1 pb-[12px]">
                            <FaUserGroup className="bg-[#b9d4eb] w-[36px] h-[31px] p-2 rounded-lg" />
                            <h1 className="font-roboto text-[18px] font-bold">Total Users</h1>
                        </div>
                        <div className="flex items-center gap-2 pb-[4px]">
                            <h1 className="font-roboto text-[26px] font-bold">37k</h1>
                            <FaArrowTrendUp className="text-green-500" />
                        </div>
                        <p className="font-roboto text[12px]">0.5 increase in last 7 days</p>
                    </div>

                    {/* two */}
                    <div className="md:w-[336px] h-[151px] p-5 border rounded-lg">
                        <div className="flex items-center gap-1 pb-[12px]">
                            <FaBalanceScale className="bg-[#b9d4eb] w-[36px] h-[31px] p-2 rounded-lg" />
                            <h1 className="font-roboto text-[18px] font-bold">Lawyers</h1>
                        </div>
                        <div className="flex items-center gap-2 pb-[4px]">
                            <h1 className="font-roboto text-[26px] font-bold">37k</h1>
                            <FaArrowTrendUp className="text-green-500" />
                        </div>
                        <p className="font-roboto text[12px]">0.5 increase in last 7 days</p>
                    </div>

                    {/* three */}
                    <div className="md:w-[336px] h-[151px] p-5 border rounded-lg">
                        <div className="flex items-center gap-1 pb-[12px]">
                            <img src="logo/clients.png" alt="client logo" className="bg-[#b9d4eb] w-[36px] h-[31px] p-2 rounded-lg" />
                            <h1 className="font-roboto text-[18px] font-bold">Clients</h1>
                        </div>
                        <div className="flex items-center gap-2 pb-[4px]">
                            <h1 className="font-roboto text-[26px] font-bold">37k</h1>
                            <FaArrowTrendUp className="text-green-500" />
                        </div>
                        <p className="font-roboto text[12px]">0.5 increase in last 7 days</p>
                    </div>

                </div>
            </div>

            {/* dynamic chart */}
            <Chart />
        </div>
    )
}

export default CommonLayout