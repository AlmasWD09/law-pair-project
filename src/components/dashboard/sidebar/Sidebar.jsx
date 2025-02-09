import { AiFillHome } from "react-icons/ai";



const Sidebar = () => {
    const menus = [
        {
            path: '/dashboard',
            title: 'Dashboard'
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
                                <a className="bg-red-300 hover:bg-red-600 hover:text-white  py-1 rounded-md flex items-center gap-2 px-2" href={item.path} key={index}><AiFillHome /> {item.title}</a>
                            )
                        })
                    }
                </div>
            </div>

            <div className="pb-4">
                <a className="bg-[#b9d4eb] hover:text-white  py-[10px] rounded-md flex items-center gap-2 px-2" href="#"><AiFillHome /></a>
            </div>
        </div>
    )
}

export default Sidebar