import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { Button, Pagination } from "antd";
import { useState } from "react";
import Cookies from "js-cookie";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import CustomNotFound from "../../components/shared/CustomNotFound";

const AttorneyTm = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const lawyersData = location.state?.lawyers || [];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // token get in cookies
  const userToken = Cookies.get("userToken");

  const handleNavigate = () => {
    navigate(-1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Slice data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = lawyersData?.slice(startIndex, endIndex);

  const handleFavoriteList = async (id) => {
    const favoriteInfo = {
      lawyer_id: id,
      // is_favorite: "true",
    };

    if (userToken) {
      try {
        const response = await axiosPublic.post(
          "/user/mark-as-favorite",
          favoriteInfo,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        );
        if (response.data.success) {
          toast.success("Favorite successfully");
          navigate("/user-profile");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-40">
      <div>
        <div className="max-w-[1037px] mx-auto">
          <span>
            <FaArrowLeft
              onClick={handleNavigate}
              className="text-[20px] text-[#60606A] cursor-pointer"
            />
          </span>
          <div className="flex items-center justify-center gap-3 pt-10">
            <Link to={"/"}>
              <span className="flex items-center gap-1 font-roboto text-[14px] text-[#60606A]">
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.16669 13.7643C3.16669 14.1325 3.46516 14.4309 3.83335 14.4309H13.1667C13.5349 14.4309 13.8334 14.1325 13.8334 13.7643V7.76427H15.8334L8.94869 1.5056C8.69434 1.27417 8.3057 1.27417 8.05135 1.5056L1.16669 7.76427H3.16669V13.7643ZM12.5 6.53562V13.0976H4.50002V6.53562L8.50002 2.89962L12.5 6.53562Z"
                    fill="#60606A"
                  />
                </svg>
                Home
              </span>
            </Link>
            /
            <span className="font-roboto text-[14px] text-[#60606A] ">
              Find your attorney
            </span>
            /
            <span className="font-roboto text-[14px] text-[#10101E] font-bold">
              attorney
            </span>
          </div>
          <h3 className="font-roboto text-[16px] text-[#121221] py-[26px]">
            LawPair suggested attorneys TM
          </h3>
        </div>

        <div className="flex justify-center">
          {!paginatedData?.length ? (
            <>
              <CustomNotFound offBack />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                {paginatedData?.map((attorney, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[300px] h-[348px] p-4 shadow-lg rounded-md"
                    >
                      <Link
                        to={`/attorney-tm-details/${attorney.id}`}
                        key={index}
                      >
                        <img
                          src={attorney?.avatar}
                          alt="attorney"
                          className="w-full h-[200px]"
                        />
                      </Link>
                      {/* <Link to={`/attorney-tm-details/${attorney.id}`} key={index}>
                                                            <img src={attorney.avatar} alt="attorney" className="w-full" />
                                                        </Link> */}
                      <div className="flex justify-between items-center">
                        <h2 className="text-[20px] font-bold font-roboto text-[#001018] pb-2 pt-[16px]">
                          {attorney.full_name}
                        </h2>
                        {attorney.is_favorite === false ? (
                          <span>
                            <FaRegCheckCircle
                              onClick={() => handleFavoriteList(attorney.id)}
                              className="cursor-pointer"
                            />
                          </span>
                        ) : (
                          <span
                            onClick={() => handleFavoriteList(attorney.id)}
                            className="cursor-pointer"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.3824 11.0689C9.50441 11.1213 9.61475 11.1975 9.707 11.293L11 12.586L14.293 9.29302C14.3852 9.19751 14.4956 9.12133 14.6176 9.06892C14.7396 9.01651 14.8708 8.98892 15.0036 8.98777C15.1364 8.98662 15.2681 9.01192 15.391 9.0622C15.5138 9.11248 15.6255 9.18673 15.7194 9.28063C15.8133 9.37452 15.8875 9.48617 15.9378 9.60907C15.9881 9.73196 16.0134 9.86364 16.0122 9.99642C16.0111 10.1292 15.9835 10.2604 15.9311 10.3824C15.8787 10.5044 15.8025 10.6148 15.707 10.707L11.707 14.707C11.5195 14.8945 11.2652 14.9998 11 14.9998C10.7348 14.9998 10.4805 14.8945 10.293 14.707L8.293 12.707C8.19749 12.6148 8.1213 12.5044 8.0689 12.3824C8.01649 12.2604 7.9889 12.1292 7.98775 11.9964C7.98659 11.8636 8.0119 11.732 8.06218 11.6091C8.11246 11.4862 8.18671 11.3745 8.2806 11.2806C8.3745 11.1867 8.48615 11.1125 8.60904 11.0622C8.73194 11.0119 8.86362 10.9866 8.9964 10.9878C9.12918 10.9889 9.2604 11.0165 9.3824 11.0689Z"
                                fill="#05C793"
                              />
                            </svg>
                          </span>
                        )}
                      </div>

                      <h3 className="text-[14px] font-roboto text-[#001018]">
                        {attorney.state}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="py-8">
          <Pagination
            current={currentPage}
            total={lawyersData.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            align="center"
          />
        </div>
      </div>
    </div>
  );
};

export default AttorneyTm;
