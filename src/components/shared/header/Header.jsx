import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { TfiClose } from "react-icons/tfi";
import Button from "../Button";
import { RiSearchLine } from "react-icons/ri";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Header = () => {
const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [navbar, setNavbar] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const handleNavigaet = () => {
        navigate('/')
    }

    const [searchValue, setSearchValue] = useState('')





    // background color add in navbar scroll
    const changeBackground = () => {
        if (window.scrollY >= 32) {
            setNavbar(true)
        }
        else { setNavbar(false) }
    }
    window.addEventListener('scroll', changeBackground)

    const handleMenu = () => {
        setMenuOpen(!menuOpen)
    }


    const handleSearch = async () => {
        try {
          const response = await axiosPublic.get(`/search-lawyer?name=${searchValue}`);
          if(response.data.success){
            navigate('/search-attorney', { state: { searchResults: response.data.lawyers.data            } })
          }

        } catch (error) {
          console.error("Error fetching search results");
        }
      };



    // const name = 'Jone Doe'
    // const photUrl = '/attorney1.png'

    return (
        <>
            <header id="sidebar" className={navbar ? ' bg-gray-300 sticky top-0 left-0 z-[99999] shadow-md w-full   py-4 lg:py-6  overflow-visible' : 'sticky top-0 left-0 z-[99999] shadow-md w-full py-4 lg:py-6  overflow-visible '}>
                <div className="container mx-auto px-4 flex items-center">
                    <nav className="relative container flex justify-between items-center">
                        {/* navbar website name and logo */}
                        <div className=" flex items-center gap-6">
                            <div
                                onClick={handleNavigaet}
                                className="flex items-center cursor-pointer">
                                <img className="w-[161px] h-[50px] object-contain" src="/logo3.png" alt="nav logo" />
                            </div>
                            <div className="relative mt-4 md:mt-0 hidden md:block">
                                <input
                                    type="text"
                                    maxLength={18}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="w-[201px] h-[50px] py-2 pl-3 pr-4 text-gray-700 bg-transparent border rounded  outline-none"
                                    placeholder="Search attorney..."
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pl-3 "
                                >
                                    <RiSearchLine
                                    onClick={handleSearch}
                                    className="w-10 h-8 pr-3 text-primary" />
                                </span>
                            </div>

                        </div>

                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className={`absolute right-[2px] top-1/2 block -translate-y-1/2  rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${isOpen ? 'navbarTogglerActive' : ''
                                    }`}

                            >
                                {!isOpen ? (
                                    <TfiClose className="text-2xl " />
                                ) : (
                                    <VscMenu className="text-2xl " />
                                )}
                            </button>
                        </div>

                        {/* mobile menu */}
                        <div
                            className={`${isOpen ? "-right-full" : "right-0"
                                }  w-2/3 h-screen p-4 fixed  top-[82px] md:top-[82px] z-[999999] bg-primaryGray  shadow-md flex flex-col space-y-4 my-transition bg-gray-100`}
                        >
                            <div className="flex flex-col lg:hidden space-y-4">
                                <NavLink to='/' >
                                    <Button text={" Home"} />
                                </NavLink>
                                <NavLink to='/about' >
                                    <Button text={"About Us"} />

                                </NavLink>
                                <NavLink to='/disclaimer' >
                                    <Button text={"Disclaimer"} />

                                </NavLink>
                                <NavLink to='/legal-resources' >
                                    <Button text={"Legal Resources"} />

                                </NavLink>

                                {/* <div className="relative mt-4 md:mt-0 max-w-[175px]">
                                    <input
                                        type="text"
                                        maxLength={18}
                                        className="max-w-[175px] h-[40px] py-2 px-4 pl-3 pr-4 text-gray-700 bg-transparent border rounded  outline-none"
                                        placeholder="Search attorney..."
                                    />
                                    <span className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <RiSearchLine className="w-8 h-8 pr-3 text-primary" />
                                    </span>
                                </div> */}

                                {/* navbar Sign Up and login button */}
                                <div className=" bg-secondery/50 rounded-md py-3">
                                    <div className="flex items-center gap-4 border-[#E7E7E9] ">
                                        {
                                            name && photUrl ? <div className="border px-1 py-2">
                                                <button className=" rounded-[4px] text-[16px]
                                        text-primary font-roboto pt-2 font-bold flex gap-2">
                                                    <h2 className="">Create an Account</h2>
                                                    <img src={photUrl} alt="" className="h-[20px] rounded-full" />
                                                </button>
                                            </div>
                                                :
                                                <Link to='/create-account'>
                                                    <button className="bg-primary  rounded-[4px] text-[16px]
                                        text-[#FFFFFF] px-2 pt-2 font-bold flex gap-2">
                                                        <h2 className="">Create an Account</h2>
                                                        <span className="h-[20px] ">
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.666 5C16.666 4.53976 16.2929 4.16667 15.8327 4.16667C15.3724 4.16667 14.9994 4.53976 14.9994 5V8.33333C14.9994 8.79357 15.3724 9.16667 15.8327 9.16667C16.2929 9.16667 16.666 8.79357 16.666 8.33333V5Z" fill="white" />
                                                                <path d="M17.4994 5.83333H14.166C13.7058 5.83333 13.3327 6.20643 13.3327 6.66667C13.3327 7.1269 13.7058 7.5 14.166 7.5H17.4994C17.9596 7.5 18.3327 7.1269 18.3327 6.66667C18.3327 6.20643 17.9596 5.83333 17.4994 5.83333Z" fill="white" />
                                                                <path fillSRule="evenodd" clipRule="evenodd" d="M4.16602 11.6667C4.16602 10.7458 4.91768 10 5.84018 10H12.4918C13.4169 10 14.166 10.745 14.166 11.6717V15.3717C14.166 18.2092 4.16602 18.2092 4.16602 15.3717V11.6667Z" fill="white" />
                                                                <path d="M9.16602 9.16667C11.007 9.16667 12.4993 7.67428 12.4993 5.83333C12.4993 3.99238 11.007 2.5 9.16602 2.5C7.32507 2.5 5.83268 3.99238 5.83268 5.83333C5.83268 7.67428 7.32507 9.16667 9.16602 9.16667Z" fill="white" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* tablet & dastop munu items*/}
                        <div className=" lg:flex lg:justify-center lg:items-center items-center hidden">
                            <div className="flex items-center">
                                <NavLink to='/' className={({ isActive }) => isActive ? "underline text-primary font-semibold" : ""}>
                                    <Button text={" Home"} />
                                </NavLink>
                                <NavLink to='/about' >
                                    <Button text={"About Us"} />

                                </NavLink>
                                <NavLink to='/disclaimer' >
                                    <Button text={"Disclaimer"} />

                                </NavLink>
                                <NavLink to='/legal-resources' >
                                    <Button text={"Legal Resources"} />

                                </NavLink>
                            </div>
                        </div>
                        {/* navbar signup and login button */}
                        <div className="lg:flex lg:justify-end hidden ">

                            <div className="">
                                {
                                    name && photUrl ? <div className="border px-4 py-2">
                                        <button className=" rounded-[4px] text-[16px]
                                        text-primary font-roboto pt-2 font-bold flex gap-2">
                                            <h2 className="">Create an Account</h2>
                                            <img src={photUrl} alt="" className="h-[20px] rounded-full" />
                                        </button>
                                    </div>
                                        :
                                        <Link to='/create-account'>
                                            <button className=" bg-primary w-[204px] h-[48px] flex justify-center items-center gap-1 rounded-[4px] text-[16px] text-[#FFFFFF] font-bold">
                                                <h2 className="font-roboto font-bold pt-2">Create an Account</h2>
                                                <span className="h-[20px]">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.666 5C16.666 4.53976 16.2929 4.16667 15.8327 4.16667C15.3724 4.16667 14.9994 4.53976 14.9994 5V8.33333C14.9994 8.79357 15.3724 9.16667 15.8327 9.16667C16.2929 9.16667 16.666 8.79357 16.666 8.33333V5Z" fill="white" />
                                                        <path d="M17.4994 5.83333H14.166C13.7058 5.83333 13.3327 6.20643 13.3327 6.66667C13.3327 7.1269 13.7058 7.5 14.166 7.5H17.4994C17.9596 7.5 18.3327 7.1269 18.3327 6.66667C18.3327 6.20643 17.9596 5.83333 17.4994 5.83333Z" fill="white" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.16602 11.6667C4.16602 10.7458 4.91768 10 5.84018 10H12.4918C13.4169 10 14.166 10.745 14.166 11.6717V15.3717C14.166 18.2092 4.16602 18.2092 4.16602 15.3717V11.6667Z" fill="white" />
                                                        <path d="M9.16602 9.16667C11.007 9.16667 12.4993 7.67428 12.4993 5.83333C12.4993 3.99238 11.007 2.5 9.16602 2.5C7.32507 2.5 5.83268 3.99238 5.83268 5.83333C5.83268 7.67428 7.32507 9.16667 9.16602 9.16667Z" fill="white" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </Link>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;