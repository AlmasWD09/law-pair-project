
import AccountCreate from "../../layout/AccountCreate"
import { useEffect, useMemo, useState } from 'react';
import { Form, Button, Typography, Space, Modal, Select, TimePicker, DatePicker, Input, Upload } from "antd";
const { Title } = Typography;
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import moment from 'moment';
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';



const EditLawyerProfile = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categorieData, setCategorieData] = useState([]);
  const [lawyerAllData, setLawyerAllData] = useState({});
  const [ImageFileList, setImageFileList] = useState([]);



  const [selectedOptions, setSelectedOptions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('')




  // lawyer token 
  const lawyerToken = Cookies.get("lawyerToken");

  const {
    first_name,
    last_name,
    full_name,
    address,
    avatar,
    categories,
    email,
    experience,
    languages,
    phone,
    practice_area,
    state,
    web_link,
    schedule,

  } = lawyerAllData || {};

  useEffect(() => {
    if (lawyerAllData) {
      form.setFieldsValue({
        ...lawyerAllData,
        first_name: first_name,
        last_name: last_name,
        full_name: full_name,
        address: address,
        avatar: avatar,
        categories: categories,
        email: email,
        experience: experience,
        languages: languages,
        phone: phone,
        practice_area: practice_area,
        state: state,
        web_link: web_link,
        day: lawyerAllData.schedule?.day,
        startTime: lawyerAllData.schedule?.startTime,
        endTime: lawyerAllData.schedule?.endTime,
      });
      if (lawyerAllData.avatar) {
        setImageFileList([
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: lawyerAllData.avatar,
          },
        ]);
      }
    }
  }, [lawyerAllData, form]);



  const filteredCategories = categorieData.filter(category =>
    categories?.includes(category.name)
  );



  // Handle select change
  const handleSelect = (value) => {
    if (value.length <= 3) {
      setSelectedOptions(value); // update selected values if it's 3 or fewer
    } else {
      toast.error('You can select a maximum of 3 options');
    }
  };













  // lawyer all value get
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axiosPublic.get('/lawyer/profile', {
          headers: {
            Authorization: `Bearer ${lawyerToken}`,
            "Accept": "application/json"
            // ✅ Send token in Authorization header
          }

        });
        setLawyerAllData(response?.data?.lawyer)
        setStartTime(dayjs(response?.data?.lawyer?.schedule?.time, "HH:mm:ss"));
        setEndTime(dayjs(response?.data?.lawyer?.schedule?.time, "HH:mm:ss"));
        setAllCategories(response?.data?.lawyer?.categories || []);
        setSelectedOptions(response?.data?.lawyer?.categories || []);
      } catch (error) {
        console.error('Failed to load data:',);
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




  // filteredCategories.map(category =>console.log(category.name))

  const onFinish = async (values) => {

    const service_ids = selectedOptions
    const schedule = {
      time: `${startTime} - ${endTime}`,
    }

    const formData = new FormData();
    formData.append('service_ids', JSON.stringify(service_ids))
    formData.append('practice_area', values.practice_area)
    formData.append('experience', values.experience)
    formData.append('languages', values.languages)
    if (ImageFileList[0]?.originFileObj) {
      formData.append("avatar", ImageFileList[0].originFileObj);
    }
    formData.append('state', values.state)
    formData.append('address', values.address)
    formData.append('phone', values.phone)

    formData.append('web_link', values.web_link)
    formData.append('day', values.day)
    formData.append('schedule', schedule.time);


    formData.forEach((value, key) => {
      console.log(key, value);
    });



    // try {
    //   const response = await axiosPublic.post('/lawyer/update-profile', formData, {
    //     headers: {
    //       Authorization: `Bearer ${lawyerToken}`,
    //       "Accept": "application/json"
    //     }

    //   });

    //   console.log(response.data)
    //   if (response.data.success) {
    //     toast.success('Profile Update successfully')
    //     navigate('/lawyer-profile')
    //   }

    // } catch (error) {
    //   toast.error('Something went wrong! please try again');
    // }
  }

  return (
    <AccountCreate>
      <div className="container mx-auto px-4 border rounded-md my-4 p-4">
        <h1 className="font-roboto font-bold text-center text-2xl uppercase text-primary">Edit Lawyer Profile </h1>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <Space style={{ width: '100%', height: '40px' }} direction="vertical">
              <Select
                style={{ width: '100%', height: '40px' }}
                mode="multiple"
                allowClear
                placeholder="Please select"
                maxTagCount={3}
                value={selectedOptions}
                onChange={handleSelect}
              >
                {categorieData.map((option, index) => {
                  const isOptionDisabled = allCategories.includes(option.id) && !selectedOptions.includes(option.id);

                  return (
                    <Select.Option
                      style={{ width: '100%', height: '40px' }}
                      key={index}
                      value={option.id}
                      disabled={isOptionDisabled} // Disable options that are fetched and not selected
                    >
                      {option.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Space>



          </div>



          <div className="mt-8">
            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Where do you practice</p>
              <Form.Item name="practice_area">
                <Input placeholder='e.g.: New Jersey, New York, EOIR (Immigration Court)' style={{ width: '100%', height: '40px' }} />
              </Form.Item>
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Experience</p>
              <Form.Item name="experience" >
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
              </Form.Item>
            </div>

            <div className='pb-4 w-full'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Language</p>
              <Form.Item name="languages">
                <Select
                  showSearch
                  placeholder="Select..."
                  style={{ width: '100%', height: '40px' }}
                  options={[
                    { label: "English", value: "english" },
                    { label: "Spanish", value: "spanish" },
                    { label: "German", value: "german" },
                    { label: "Russian", value: "russian" }
                  ]}
                />
              </Form.Item>
            </div>










            <div className="pb-4 w-full">
              <p className="text-[14px] font-roboto font-bold text-[#001018]">Upload profile photo</p>
              <div className="w-full ">
                <Form.Item
                  className="md:col-span-2"
                  name="image"
                  rules={[
                    {
                      required: ImageFileList?.length === 0,
                      message: "Image required!",
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={false}
                    accept="image/*"
                    maxCount={1}
                    showUploadList={{ showPreviewIcon: true }}
                    fileList={ImageFileList}
                    onChange={({ fileList }) => setImageFileList(fileList)}
                    listType="picture-card"
                  >
                    <div className="flex flex-col items-center">
                      <UploadCloud className="w-5 h-5 text-gray-400" />
                      <span className="mt-2">Choose File</span>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            <div className='pb-4 w-full'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>State</p>
              <Form.Item name='state'>
                <Input style={{ width: '100%', height: '40px' }} />
              </Form.Item>
            </div>


            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Office address</p>
              <Form.Item name='address'>
                <Input placeholder='address' style={{ width: '100%', height: '40px' }} />
              </Form.Item>
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Mobile number</p>
              <Form.Item name='phone'>
                <Input placeholder='Enter your contact number to reach client' style={{ width: '100%', height: '40px' }} />
              </Form.Item>
            </div>

            <div className='pb-4'>
              <p className='text-[14px] font-roboto font-bold text-[#001018]'>Website link (optional)</p>
              <Form.Item name='web_link'>
                <Input placeholder='Include a link to your website here' style={{ width: '100%', height: '40px' }} />
              </Form.Item>
            </div>



            <div className='pb-4'>
              <div className='flex flex-col lg:flex-row justify-between items-center gap-6 pb-4'>
                <div className='w-full'>
                  <p className='text-[14px] font-roboto font-bold text-[#001018]'>Availability (optional)</p>
                  <Form.Item name="day" >
                    <Select
                      showSearch
                      style={{ width: '100%', height: '40px' }}
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
                  </Form.Item>
                </div>


                <div className='w-full'>
                  <Form.Item >
                    <p className='text-[14px] font-roboto font-bold text-primary lg:text-end'>Start Time</p>
                    <TimePicker value={startTime} style={{ width: "100%", height: '40px' }} onChange={(time) => setStartTime(time)} />
                  </Form.Item>
                </div>

              </div>
              <div className='w-full'>
                <Form.Item >
                  <p className='text-[14px] font-roboto font-bold text-primary lg:text-end'>End Time</p>
                  <TimePicker value={endTime} style={{ width: "100%", height: '40px' }} onChange={(time) => setEndTime(time)} Pm />
                </Form.Item>
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





