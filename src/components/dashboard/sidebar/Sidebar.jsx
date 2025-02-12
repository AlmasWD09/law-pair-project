import { icons } from "antd/es/image/PreviewGroup";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";



const Sidebar = () => {
    const menus = [
        {
            path: '/dashboard',
            title: 'Dashboard',
            icon: (
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0Z" fill="#121221" />
                </svg>
            )
        },
        {
            path: '/dashboard/add-categories',
            title: 'Add categories',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_571_7860" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style={{ maskType: "alpha" }}>
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_571_7860)">
                        <path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3Z" fill="#121221" />
                    </g>
                </svg>
            )
        },
        {
            path: '/dashboard/manage-user',
            title: 'Manage users',
            icon: (
                <svg width="24" height="24" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 13V15H0V13C0 13 0 9.00004 7 9.00004C14 9.00004 14 13 14 13ZM10.5 3.50004C10.5 2.8078 10.2947 2.13111 9.91014 1.55554C9.52556 0.979969 8.97893 0.531365 8.33939 0.266459C7.69985 0.0015519 6.99612 -0.0677598 6.31718 0.0672885C5.63825 0.202337 5.01461 0.53568 4.52513 1.02516C4.03564 1.51465 3.7023 2.13829 3.56725 2.81722C3.4322 3.49615 3.50152 4.19989 3.76642 4.83943C4.03133 5.47897 4.47993 6.0256 5.0555 6.41018C5.63108 6.79477 6.30777 7.00004 7 7.00004C7.92826 7.00004 8.8185 6.63129 9.47487 5.97491C10.1313 5.31853 10.5 4.42829 10.5 3.50004ZM13.94 9.00004C14.5547 9.47578 15.0578 10.0805 15.4137 10.7715C15.7696 11.4626 15.9697 12.2233 16 13V15H20V13C20 13 20 9.37004 13.94 9.00004ZM13 3.67965e-05C12.3118 -0.00316434 11.6388 0.202568 11.07 0.590037C11.6774 1.43877 12.0041 2.45632 12.0041 3.50004C12.0041 4.54375 11.6774 5.5613 11.07 6.41004C11.6388 6.79751 12.3118 7.00324 13 7.00004C13.9283 7.00004 14.8185 6.63129 15.4749 5.97491C16.1313 5.31853 16.5 4.42829 16.5 3.50004C16.5 2.57178 16.1313 1.68154 15.4749 1.02516C14.8185 0.368786 13.9283 3.67965e-05 13 3.67965e-05Z" fill="#121221" />
                </svg>
            )
        },
        {
            path: '/dashboard/setting',
            title: 'Settings',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.25001 22L8.85001 18.8C8.63335 18.7167 8.42935 18.6167 8.23801 18.5C8.04668 18.3833 7.85901 18.2583 7.67501 18.125L4.70001 19.375L1.95001 14.625L4.52501 12.675C4.50835 12.5583 4.50001 12.446 4.50001 12.338V11.663C4.50001 11.5543 4.50835 11.4417 4.52501 11.325L1.95001 9.375L4.70001 4.625L7.67501 5.875C7.85835 5.74167 8.05001 5.61667 8.25001 5.5C8.45001 5.38333 8.65001 5.28333 8.85001 5.2L9.25001 2H14.75L15.15 5.2C15.3667 5.28333 15.571 5.38333 15.763 5.5C15.955 5.61667 16.1423 5.74167 16.325 5.875L19.3 4.625L22.05 9.375L19.475 11.325C19.4917 11.4417 19.5 11.5543 19.5 11.663V12.337C19.5 12.4457 19.4833 12.5583 19.45 12.675L22.025 14.625L19.275 19.375L16.325 18.125C16.1417 18.2583 15.95 18.3833 15.75 18.5C15.55 18.6167 15.35 18.7167 15.15 18.8L14.75 22H9.25001ZM12.05 15.5C13.0167 15.5 13.8417 15.1583 14.525 14.475C15.2083 13.7917 15.55 12.9667 15.55 12C15.55 11.0333 15.2083 10.2083 14.525 9.525C13.8417 8.84167 13.0167 8.5 12.05 8.5C11.0667 8.5 10.2373 8.84167 9.56201 9.525C8.88668 10.2083 8.54935 11.0333 8.55001 12C8.55068 12.9667 8.88835 13.7917 9.56301 14.475C10.2377 15.1583 11.0667 15.5 12.05 15.5Z" fill="#121221" />
                </svg>
            )
        },
    ];



    return (
        <div className="h-full flex flex-col justify-between  mx-4">
            <div>
                <img src="/logo.png" alt="logo" className="w-full object-contain pt-6 " />
                {/* sidebar menu */}
                <div className="h-full flex flex-col gap-4 pt-8 py-2 ">
                    {
                        menus.map((item, index) => {
                            return (
                                <NavLink to={item.path} key={index} end={item.path === "/dashboard"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 font-roboto text-primary font-bold px-2 py-2 bg-[#e9f1f9] rounded-lg"
                                            : "flex items-center gap-2 font-roboto px-2 py-2 hover:bg-[#e9f1f9] rounded-lg"
                                    }>{item.icon} {item.title}</NavLink>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex items-center justify-between bg-[#b9d4eb] rounded-md py-2 px-2 mb-3">
                <div className="flex items-center gap-2">
                    <img src="/legalImage/legal1.png" alt="" className="w-[30px] h-[30px] rounded-full object-cover" />
                    <h1 className="text-xl font-roboto font-bold ">
                        Papatundee
                    </h1>
                </div>
                <div>
                    <img src="/logo/login.png" alt="login image" className="w-[30px] h-[30px]" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar