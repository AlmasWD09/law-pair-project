import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import DashboardNavbar from "../components/dashboard/dashboardNavbar/DashboardNavbar";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const DashboardLayout = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <div className="relative flex h-screen">
            {/* Sidebar component */}
            <div className="hidden lg:block w-1/5 bg-[#FFFF] h-full fixed">
                <Sidebar />
            </div>

            {/* ============= mobile & tablet sidebar start ========== */}
            {
                showDrawer && <div className="lg:hidden absolute w-[56%] md:w-[40%] h-screen bg-red-200 z-50">
                    <div className="flex items-center justify-between px-3 py-[18px] bg-gray-50 shadow-2xl border-b">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="logo" />
                            <h1 className="text-xl font-semibold">AdminLayout</h1>
                        </div>
                        <FaArrowLeft
                        onClick={()=>setShowDrawer(!showDrawer)}
                        className="text-2xl"/>
                    </div>
                </div>
            }
            {/* ============= mobile & tablet sidebar end ========== */}


            {/* Main content area */}
            <div className=" lg:ml-[20%] w-full lg:w-[80%] flex flex-col">
                <div className="order-1">
                    <DashboardNavbar showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
                </div>

                <div className="order-2 flex-1 overflow-y-auto p-6 bg-gray-300">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
