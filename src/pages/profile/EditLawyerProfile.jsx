import AccountCreate from "../../layout/AccountCreate"
import { useEffect, useState } from 'react';
import { Form, Button, Typography, Space, Modal, Select, TimePicker, DatePicker, Input, Upload } from "antd";
const { Title } = Typography;
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Cookies from "js-cookie";



const EditLawyerProfile = () => {
  const axiosPublic = useAxiosPublic()
  const [lawyerForm] = Form.useForm(); // Form instance
  const [categorieData, setCategorieData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);


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



  const token = Cookies.get("lawyerToken");
  const onFinish = (values) => {
    console.log(values)


    const formData = new FormData();

    if (fileList && fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }
    formData.append('service_ids', modalOneValue)
    formData.append('practice_area', lowyerSelectValue.practice)
    formData.append('experience', lowyerSelectValue.experience)
    formData.append('languages', lowyerSelectValue.language)
    formData.append('state', lowyerSelectValue.state)
    formData.append('address', lowyerSelectValue.address)
    formData.append('phone', lowyerSelectValue.mobile)
    // formData.append('zipCode', lowyerSelectValue.zipCode) /// post-------->

    formData.append('web_link', webLink)
    formData.append('schedule', JSON.stringify(schedule));


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

        <Form form={lawyerForm} layout="vertical" onFinish={onFinish}>
          <div>
            <Space wrap className=" max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 mt-16">
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
              <Input name='practice' placeholder='e.g.: New Jersey, New York, EOIR (Immigration Court)' style={{ width: '100%', height: '40px' }} />
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Experience</p>
              <Select
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
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>City</p>
              <Select
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

            <div className='pb-4 w-full'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>State</p>
              <Input name='state' style={{ width: '100%', height: '40px' }} />
            </div>


            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Office address</p>
              <Input name='address' placeholder='address' style={{ width: '100%', height: '40px' }} />
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Mobile number</p>
              <Input name='mobile' placeholder='Enter your contact number to reach client' style={{ width: '100%', height: '40px' }} />
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Website link (optional)</p>
              <Input name='webLink'
                placeholder='Include a link to your website here' style={{ width: '100%', height: '40px' }} />
            </div>

            {/* schedule */}
          </div>


          <Button block type="submit" style={{ backgroundColor: "#1b69ad", fontFamily: "Roboto", fontWeight: "bold", fontSize: "16px", color: "white", padding: "20px 0px" }}>
            Update Profile
          </Button>
        </Form>
      </div>
    </AccountCreate>
  )
}

export default EditLawyerProfile