import AccountCreate from "../../layout/AccountCreate"
import { useEffect, useState } from 'react';
import { Form, Button, Typography, Space, Modal, Select, TimePicker, DatePicker, Input, Upload } from "antd";
const { Title } = Typography;
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";



const EditLawyerProfile = () => {
  const axiosPublic = useAxiosPublic()
  const [form] = Form.useForm();
  const [categorieData, setCategorieData] = useState([]);
  const [lawyerAllData, setLawyerAllData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);


  const [fileList, setFileList] = useState([]);
  const [webLink, setWebLink] = useState("");
  const [availability, setAvailability] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);


  const token = Cookies.get("otpToken");
  const {
    id,
    first_name,
    last_name,
    full_name,
    address,
    avatar,
    // categories,
    email,
    experience,
    languages,
    phone,
    practice_area,
    schedule, // Nested destructuring
    state,
    web_link
  } = lawyerAllData || {};

  const categories = ['Trademarks', 'Advance Care Planning', 'Residential Real Estate']

  // Handle File Upload
  const handleChange = ({ fileList }) => setFileList(fileList);
  useEffect(() => {
    if (avatar) {
      setFileList([{ url: avatar }]); // Default avatar set kora
    }
  }, [avatar]); // Avatar update hole abar fileList update hob
  const handleAvailabilityChange = (value) => setAvailability(value);
  const handleTimeChange = (time, timeString, type) => {
    if (type === "start") setStartTime(timeString);
    if (type === "end") setEndTime(timeString);
  };

  // lawyer all value get
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axiosPublic.get('/lawyer/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept": "application/json"
            // ✅ Send token in Authorization header
          }

        });
        setLawyerAllData(response?.data?.lawyer)

      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchAllData();
  }, []);

  // first modal option get server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/admin/categories?per_page=10`);
        setCategorieData(response?.data?.categories.data)

      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);


  const handleSelect = (option) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option.id)) {

        return prev.filter((item) => item !== option.id);
      } else if (prev.length < 3) {

        return [...prev, option.id];
      } else {
        return prev;
      }
    });
  };

  const onFinish = (values) => {
    console.log(values)
    console.log('clicik')


    const formData = new FormData();

    if (fileList && fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }
    formData.append("service_ids", JSON.stringify(selectedOptions));
    formData.append("practice_area", values.practice);
    formData.append("experience", values.experience);
    formData.append("languages", values.language);
    formData.append("state", values.state);
    formData.append("address", values.address);
    formData.append("phone", values.mobile);
    formData.append("web_link", values.webLink);
    formData.append("availability", values.availability);
    formData.append("start_time", values.startTime);
    formData.append("end_time", values.endTime);


    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // try {
    //     const response = await axiosPublic.post('/lawyer/update-profile', formData,{
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Accept": "application/json"
    //             // ✅ Send token in Authorization header
    //         }

    //     });

    //     console.log("Server Response:", response.data);

    // } catch (error) {
    //     toast.error("Error sending data to the server:", error);
    // }
    // navigate('/lawyer-profile')

  }

  return (
    <AccountCreate>
      <div className="container mx-auto px-4 border rounded-md my-4 p-4">
        <h1 className="font-roboto font-bold text-center text-2xl uppercase text-primary">Edit Lawyer Profile </h1>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <Space wrap className=" mt-16">
              {categorieData.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelect(option)}
                  disabled={selectedOptions.length === 3 && !selectedOptions.includes(option.id)}
                  style={{
                    borderRadius: 20,
                    backgroundColor: selectedOptions.includes(option.id) ? "#1b69ad" : "#FFFFFF",
                    color: selectedOptions.includes(option.id) ? "#FFFFFF" : "#1b69ad",
                    border: "1px solid #B6B6BA",
                    fontWeight: "bold",
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    padding: "20px",
                    cursor: selectedOptions.length === 3 && !selectedOptions.includes(option.id) ? "not-allowed" : "pointer",
                    opacity: selectedOptions.length === 3 && !selectedOptions.includes(option.id) ? 0.5 : 1,
                  }}
                >
                  {option.name}
                </Button>

              ))}
            </Space>
          </div>

          <div className="mt-8">
            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Where do you practice</p>
              <Input value={practice_area} name='practice' placeholder='e.g.: New Jersey, New York, EOIR (Immigration Court)' style={{ width: '100%', height: '40px' }} />
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Experience</p>
              <Select
                value={experience}
                showSearch
                placeholder="Select..."
                style={{ width: '100%', height: '40px' }}

                options={[
                  { label: "1-3 Years", value: "1-3 Years" },
                  { label: "4-7 Years", value: "4-7 Years" },
                  { label: "8+ Years", value: "8+ Years" }
                ]}
              />
            </div>

            <div className='pb-4 w-full'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Language</p>
              <Select
                value={languages}
                showSearch
                placeholder="Select..."
                style={{ width: '100%', height: '40px' }}
                options={[
                  { label: "English", value: "English" },
                  { label: "Spanish", value: "Spanish" },
                  { label: "German", value: "German" },
                  { label: "Russian", value: "Russian" }
                ]}
              />
            </div>

            <div className="pb-4 w-full">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">Upload profile photo</p>
              <div className="w-full flex justify-center">
                <Upload
                  fileList={fileList}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  listType="picture-card" // Image preview dekhate use korte parben
                >
                  {fileList.length >= 1 ? null : (
                    <Button  icon={<UploadOutlined />}>Upload Image</Button>
                  )}
                </Upload>
              </div>
            </div>

            <div className='pb-4 w-full'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>State</p>
              <Input value={state} name='state' style={{ width: '100%', height: '40px' }} />
            </div>


            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Office address</p>
              <Input value={address} name='address' placeholder='address' style={{ width: '100%', height: '40px' }} />
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Mobile number</p>
              <Input value={phone} name='mobile' placeholder='Enter your contact number to reach client' style={{ width: '100%', height: '40px' }} />
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Website link (optional)</p>
              <Input value={web_link} name='webLink'
                placeholder='Include a link to your website here' style={{ width: '100%', height: '40px' }} />
            </div>

            {/* schedule */}
            <div className='pb-4'>
              <div className='flex flex-col lg:flex-row justify-between items-center gap-6 pb-4'>
                <div className='w-full'>
                  <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>

                  <Select
                    value={schedule?.day}
                    style={{ width: '100%', height: '40px' }}
                    defaultValue="Select day.."
                    onChange={handleAvailabilityChange}
                    options={[
                      { value: 'Monday', label: 'Monday' },
                      { value: 'Tuesday', label: 'Tuesday' },
                      { value: 'Wednesday', label: 'Wednesday' },
                      { value: 'Thursday', label: 'Thursday' },
                      { value: 'Friday', label: 'Friday' },
                      { value: 'Saturday', label: 'Saturday' },
                      { value: 'Sunday', label: 'Sunday' },
                    ]}
                  />
                </div>


                <div className='w-full'>
                  <p className='text-[14px] font-roboto font-bold text-primary lg:text-end'>Start Time</p>
                  <TimePicker style={{ width: "100%", height: '40px' }} onChange={(time, timeString) => handleTimeChange(time, timeString, "start")}
                  />
                </div>

              </div>
              <div className='w-full'>
                <p className='text-[14px] font-roboto font-bold text-primary lg:text-end'>End Time</p>
                <TimePicker style={{ width: "100%", height: '40px' }} onChange={(time, timeString) => handleTimeChange(time, timeString, "end")} />
              </div>
            </div>
          </div>


          <Button block htmlType="submit" style={{ backgroundColor: "#1b69ad", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", color: "white", padding: "20px 0px" }}>
            Update Profile
          </Button>
        </Form>
      </div>
    </AccountCreate>
  )
}

export default EditLawyerProfile