import { AiFillHome } from "react-icons/ai";



const Sidebar = () => {
    const menus = [
        {
            path: '/dashboard',
            title: 'Dashboard',
            icon:""
        },
        {
            path: '/dashboard/add-categories',
            title: 'Add categories'
        },
        {
            path: '/dashboard/manage-user',
            title: 'Manage users'
        },
        {
            path: '/dashboard/setting',
            title: 'Settings'
        },
    ]


    return (
        <div className="h-full flex flex-col justify-between  mx-4 ">
            <div>
                <img src="/logo.png" alt="logo" />
                {/* sidebar menu */}
                <div className="h-full flex flex-col gap-4 py-2 ">
                    {
                        menus.map((item, index) => {
                            return (
                                <a className=" hover:text-white  py-1 rounded-md flex items-center gap-2 px-2" href={item.path} key={index}><AiFillHome /> {item.title}</a>
                            )
                        })
                    }
                </div>
            </div>

            <div className="flex items-center justify-between bg-[#b9d4eb] rounded-md py-2 px-2 mb-3">
                <div className="flex items-center gap-2">
                <img src="/legalImage/legal1.png" alt="" className="w-[30px] h-[30px] rounded-full object-cover"/>
                <h1 className="text-xl font-roboto font-bold ">
                Papatundee
                </h1>
                </div>
                <div>
                    <img src="/logo/login.png" alt="login image" className="w-[30px] h-[30px]"/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar