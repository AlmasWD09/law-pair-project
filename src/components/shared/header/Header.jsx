import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { TfiClose } from "react-icons/tfi";
import Button from "../Button";
import { RiSearchLine } from "react-icons/ri";

const Header = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [navbar, setNavbar] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const handleNavigaet = () => {
        navigate('/')
    }

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
                                <img className="w-[161px] h-[50px]" src="/logo.png" alt="nav logo" />
                            </div>
                            <div className="relative mt-4 md:mt-0 hidden md:block">
                                <input
                                    type="text"
                                    maxLength={18}
                                    className="w-[201px] h-[50px] py-2 pl-3 pr-4 text-gray-700 bg-gray-100 border rounded  outline-none"
                                    placeholder="Search attorney..."
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                    <RiSearchLine className="w-10 h-8 pr-3 text-primary" />
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

                                {/* navbar Sign Up and login button */}
                                <div className=" bg-secondery/50 rounded-md py-3">
                                    <div className="flex items-center gap-4">
                                        <Link to='/create-account'>
                                            <button className="bg-primary  rounded-[4px] text-[16px]
                                        text-[#FFFFFF] px-2 py-2 font-bold flex items-center gap-1">
                                                <h2>Create an Account</h2>
                                                <img src="/createAccount.png" alt="createAccount image" />
                                            </button>
                                        </Link>

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
                            <div className="flex items-center gap-4">
                                <Link to='/create-account'>
                                    <button className="bg-primary py-[12px] px-[48px] rounded-[4px] text-[16px]
                                        text-[#FFFFFF] font-bold flex items-center gap-1">
                                        <h2>Create an Account</h2>
                                        <img src="/createAccount.png" alt="createAccount image" />
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;