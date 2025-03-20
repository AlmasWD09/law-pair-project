import { Link, useNavigate } from "react-router-dom";
import AccountCreate from "../../layout/AccountCreate"
import { FaEdit } from "react-icons/fa";
import { Button, Input, Modal, Pagination, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { UploadOutlined } from "@ant-design/icons";
import defalutAvater from "/attorney1.png"


const UserProfile = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    const [favoriteData, setFavoriteData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [modalValues, setModalValues] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
    })
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})
    const { address, avatar, email, first_name, last_name, full_name, phone, } = userData || {};

    // token get in cookies
    const userToken = Cookies.get("userToken");

    // Handle File Upload
    const handleChange = ({ fileList }) => setFileList(fileList);


    // user profile get api
    const fetchUserData = async () => {
        try {
            const response = await axiosPublic.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    Accept: "application/json",
                },
            });

            if (response.data.status) {
                setUserData(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to load data');
        }
    };


    useEffect(() => {
        if (userToken) {
            fetchUserData();
        }
    }, [userToken]);




    // first modal option get server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get(`/user/favorite-list?per_page=10`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        Accept: "application/json",
                    },
                });

                setFavoriteData(response.data?.favoriteList?.data)
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        fetchData();
    }, []);



    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    // Slice data based on current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = favoriteData.slice(startIndex, endIndex);


    // logout function
    const handleLogout = async () => {
        try {
            const response = await axiosPublic.get('/logout', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    Accept: "application/json",
                },
            })
            console.log(response.data)
            if (response.data.success) {
                toast.success('User logged out successfully!')
                Cookies.remove("userToken");
                navigate('/login')
            }
        }
        catch (error) {
            toast.error('Logout Failed')
        }
    }


    // ========== user profile update modal start ================
    const handleInputChange = (e) => {
        setModalValues({ ...modalValues, [e.target.name]: e.target.value });
    }

    const showModal = () => {
        setIsModalOpen(true);
    };



    const handleOk = async () => {
        setLoading(true);
        const formData = new FormData();

        if (fileList && fileList.length > 0) {
            formData.append("avatar", fileList[0].originFileObj);
        }

        formData.append("first_name", modalValues.first_name);
        formData.append("last_name", modalValues.last_name);
        formData.append("phone", modalValues.phone);
        formData.append("address", modalValues.address);

        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });


        try {
            const response = await axiosPublic.post('/update-profile', formData, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Accept": "application/json"
                }

            });

            console.log("Server Response:", response.data);
            if (response.data.success) {
                toast.success('Profile updated successfully!');
                setIsModalOpen(false)
                // ✅ Fetch updated user data
                fetchUserData();
                setModalValues({
                    first_name: "",
                    last_name: "",
                    phone: "",
                    address: "",
                });
                setFileList([])

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false); // Stop loading
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false)
    };


    // modal scroll off screen
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isModalOpen])
    // ========== user profile update modal end  =================



    return (
        <div className="bg-gray-100">
            <AccountCreate >
                <section className="container mx-auto px-4 pt-4">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:gap-4  place-items-center">

                            {/* sidebar */}
                            <div className="md:w-[270px] lg:w-[309px] h-[calc(100vh-122px)] bg-[#FFFFFF] flex flex-col justify-between shadow-lg rounded-lg p-4">
                                <div className="p-4">
                                    <img
                                        className="object-cover w-[124px] h-[124px] rounded-full"
                                        src={avatar}
                                        alt="Article"
                                    />
                                    <h1 className="text-[20px] font-bold font-roboto text-[#001018 pl-4 pt-[12px] pb-[24px]">
                                        {first_name} {last_name}
                                    </h1>
                                    <button
                                        onClick={showModal}
                                        className="flex items-center gap-2 border rounded-md px-4 py-2 text-[14px] font-bold text-primary mb-[24px]">
                                        Edit profile
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_599_7852" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                                <rect width="20" height="20" fill="#D9D9D9" />
                                            </mask>
                                            <g mask="url(#mask0_599_7852)">
                                                <path d="M1.66663 19.9993V16.666H18.3333V19.9993H1.66663ZM4.99996 13.3327H6.16663L12.6666 6.85352L11.4791 5.66602L4.99996 12.166V13.3327ZM3.33329 14.9993V11.4577L12.6666 2.14518C12.8194 1.9924 12.9965 1.87435 13.1979 1.79102C13.3993 1.70768 13.6111 1.66602 13.8333 1.66602C14.0555 1.66602 14.2708 1.70768 14.4791 1.79102C14.6875 1.87435 14.875 1.99935 15.0416 2.16602L16.1875 3.33268C16.3541 3.48546 16.4757 3.66602 16.552 3.87435C16.6284 4.08268 16.6666 4.29796 16.6666 4.52018C16.6666 4.72852 16.6284 4.93338 16.552 5.13477C16.4757 5.33615 16.3541 5.52018 16.1875 5.68685L6.87496 14.9993H3.33329Z" fill="#1B69AD" />
                                            </g>
                                        </svg>
                                    </button>

                                    {/* edit modal component */}
                                    <Modal centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                        width={600}
                                        footer={
                                            <div className="font-roboto flex justify-center md:justify-between items-center gap-x-4 md:px-7 pt-[24px]">
                                                <button
                                                    className="w-[40%] h-[40px] md:w-[161px] md:h-[64px] border border-[#1b69ad] text-[#1b69ad] rounded-[5px] text-[16px] font-bold"
                                                    onClick={handleCancel}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="font-roboto w-[40%] h-[40px] md:w-[161px] md:h-[64px] bg-[#1b69ad] text-white rounded-[5px] text-[16px] font-bold"
                                                    onClick={handleOk}
                                                    disabled={loading}
                                                >
                                                    {loading ? <span className="loader text-xs p-2">Loading..</span> : "Continue"}
                                                </button>
                                            </div>
                                        }
                                    >


                                        <div className="py-8">
                                            <div className="pb-4 w-full">
                                                <p className="text-[14px] font-roboto font-bold text-[#001018]">Upload profile photo</p>
                                                <div className="w-full">
                                                    <Upload
                                                        fileList={fileList}
                                                        onChange={handleChange}
                                                        beforeUpload={() => false} // Prevent auto-upload
                                                        style={{ width: '100%', height: '40px' }} // Force the Upload component to take full width
                                                        className="upload-component" // Custom class to apply further styling
                                                    >
                                                        {fileList.length >= 1 ? null : (
                                                            <Button
                                                                icon={<UploadOutlined />}
                                                                style={{ width: '100%', height: '40px' }} // Ensure the button takes up full width
                                                            >
                                                                Upload Image
                                                            </Button>
                                                        )}
                                                    </Upload>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <p className="text-[14px] font-roboto font-bold text-[#001018]">First Name</p>
                                                <Input name="first_name"
                                                    value={modalValues.first_name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Your First Name"
                                                    style={{ width: '100%', height: '40px' }}
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <p className="text-[14px] font-roboto font-bold text-[#001018]">Last Name</p>
                                                <Input name="last_name"
                                                    value={modalValues.last_name}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Your Last Name"
                                                    style={{ width: '100%', height: '40px' }}
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <p className="text-[14px] font-roboto font-bold text-[#001018]">Phone Number</p>
                                                <Input name="phone"
                                                    value={modalValues.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Your Phone Number"
                                                    style={{ width: '100%', height: '40px' }}
                                                />
                                            </div>

                                            <div className="pt-4">
                                                <p className="text-[14px] font-roboto font-bold text-[#001018]">address</p>
                                                <Input name="address"
                                                    value={modalValues.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter Your Address"
                                                    style={{ width: '100%', height: '40px' }}
                                                />
                                            </div>
                                        </div>
                                    </Modal>

                                    <hr />

                                    <div className="pt-[24px]">
                                        <div className="pl-4">
                                            <p>{email}</p>
                                            <p>{phone}</p>
                                        </div>
                                        <p className="pt-4 flex justify-between font-roboto text-[16px] text-[#10101E] text-wrap">
                                            <svg width="100" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 21.668C9.72 21.668 6 12.982 6 9.66797C6 8.07667 6.63214 6.55055 7.75736 5.42533C8.88258 4.30011 10.4087 3.66797 12 3.66797C13.5913 3.66797 15.1174 4.30011 16.2426 5.42533C17.3679 6.55055 18 8.07667 18 9.66797C18 12.982 14.28 21.668 12 21.668ZM12 12.668C12.3824 12.668 12.7611 12.5926 13.1144 12.4463C13.4677 12.3 13.7887 12.0855 14.0591 11.8151C14.3295 11.5447 14.544 11.2236 14.6903 10.8703C14.8367 10.517 14.912 10.1384 14.912 9.75597C14.912 9.37356 14.8367 8.99489 14.6903 8.64159C14.544 8.28829 14.3295 7.96728 14.0591 7.69687C13.7887 7.42647 13.4677 7.21197 13.1144 7.06563C12.7611 6.91929 12.3824 6.84397 12 6.84397C11.2277 6.84397 10.487 7.15077 9.9409 7.69687C9.3948 8.24298 9.088 8.98366 9.088 9.75597C9.088 10.5283 9.3948 11.269 9.9409 11.8151C10.487 12.3612 11.2277 12.668 12 12.668Z" fill="#10101E" />
                                            </svg>
                                            {address}
                                        </p>
                                    </div>
                                </div>

                                <div >
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1 p-4">
                                        <span className="">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 3V5H18.9999V19H11.9999V21H19.0059C20.1059 21 20.9999 20.107 20.9999 19.005V4.995C21.0002 4.73302 20.9488 4.47357 20.8487 4.23147C20.7486 3.98937 20.6018 3.76938 20.4166 3.58409C20.2314 3.3988 20.0114 3.25184 19.7694 3.15161C19.5273 3.05139 19.2679 2.99987 19.0059 3H11.9999Z" fill="#EF436B" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.97694 11C3.71472 11.0034 3.46457 11.1108 3.2814 11.2984C3.09823 11.4861 2.997 11.7388 2.99994 12.001C2.99994 12.552 3.43694 13 3.97694 13H15.0239C15.2858 12.9968 15.5357 12.8898 15.7187 12.7025C15.9017 12.5152 16.0029 12.2629 15.9999 12.001C16.0029 11.7389 15.9018 11.4864 15.7188 11.2988C15.5359 11.1111 15.286 11.0037 15.0239 11H3.97694Z" fill="#EF436B" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3029 8.305C12.1089 8.502 12.0001 8.76745 12.0001 9.044C12.0001 9.32055 12.1089 9.586 12.3029 9.783L14.4999 12L12.3029 14.217C12.1087 14.4135 11.9998 14.6787 11.9998 14.955C11.9998 15.2313 12.1087 15.4965 12.3029 15.693C12.7069 16.102 13.3629 16.102 13.7679 15.693L16.6979 12.738C16.8912 12.5408 16.9995 12.2756 16.9995 11.9995C16.9995 11.7234 16.8912 11.4582 16.6979 11.261L13.7679 8.305C13.6719 8.20858 13.5577 8.13207 13.432 8.07987C13.3063 8.02767 13.1715 8.00079 13.0354 8.00079C12.8993 8.00079 12.7646 8.02767 12.6389 8.07987C12.5132 8.13207 12.399 8.20858 12.3029 8.305Z" fill="#EF436B" />
                                            </svg>
                                        </span>
                                        <h4 className="text-[#EF436B] font-roboto font-semibold pt-2">Logout</h4>
                                    </button>
                                </div>
                            </div>







                            {/*  right side content   */}
                            <div className="col-span-2 pt-8 md:pt-0">
                                <h1 className="font-roboto text-[26px] font-bold text-[#000000] ">Your <span className="text-primary">LawPair</span> Suggested TM attorneys</h1>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-6 md:gap-2 lg:gap-6">
                                    {
                                        paginatedData.map((attorney, index) => {
                                            return (
                                                <div key={index} className="lg:first-letter lg:h-[378px] lg:w-[300px] p-4 shadow-lg rounded-md ">
                                                    <img src={attorney.avatar}
                                                        alt="Profile"
                                                        onError={(e) => e.target.src = '/attorney1.png'}
                                                        className="rounded-md" />

                                                    <div className="flex justify-between items-center">
                                                        <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px]">{attorney.state}</h2>

                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z" fill="#05C793" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-[14px] font-roboto text-[#001018]">{attorney.categories[0]}</h3>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="py-8">
                                    <Pagination
                                        current={currentPage}
                                        total={favoriteData.length}
                                        pageSize={itemsPerPage}
                                        onChange={handlePageChange}
                                        align="center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AccountCreate>
        </div>
    )
}

export default UserProfile