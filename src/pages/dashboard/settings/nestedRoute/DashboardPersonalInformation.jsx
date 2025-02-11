import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, } from "antd";
import axios from "axios";
import { useState } from "react";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const DashboardPersonalInformation = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };



  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    passwordForm.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleSaveChange = async (values) => {
    const saveChangeInfo = {
      firstName: values['first-name'],
      lastName: values['last-name'],
      contactNumber: values['contact-number'],
      location: values['location'],
    };

    // This function is called when the update password form is submitted
    console.log("Updated  Values: ", values);
    // try {
    //   const response = await axios.post('/url', saveChangeInfo);

    //   if (response.status === 200) {
    //     console.log('Password updated successfully:', response.data);
    //   } else {
    //     console.log('Error updating password:', response.data);
    //   }
    //   setIsModalOpen(false);
    // } catch (error) {
    //   console.error('Error during password update:', error);
    //   setIsModalOpen(false);
    // }

    setIsModalOpen(false);
  };



  const handleUpdatePassword = async (values) => {
    const passwordData = {
      currentPassword: values['current-password'],
      newPassword: values['new-password'],
      confirmPassword: values['confirm-password'],
    };

    // This function is called when the update password form is submitted
    console.log("Updated Password Values: ", values);

    // try {
    //   const response = await axios.post('/url', passwordData);

    //   if (response.status === 200) {
    //     console.log('Password updated successfully:', response.data);
    //   } else {
    //     console.log('Error updating password:', response.data);
    //   }
    //   setIsModalOpen(false);
    // } catch (error) {
    //   console.error('Error during password update:', error);
    //   setIsModalOpen(false);
    // }

    setIsModalOpen(false);
  };





  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Settings</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can edit personal information</p>
      </div>

      <Form form={form} onFinish={handleSaveChange}>


        {/* upload */}
        <ImgCrop rotationSlider>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>


        {/* first name & last name */}
        <div className="flex justify-between gap-3">
          <Form.Item
            name="first-name"
            rules={[{ required: true, message: "Please enter your First name" }]}
            style={{ width: "50%" }}
          >
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="First name"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}

            />
          </Form.Item>

          <Form.Item
            name="last-name"
            rules={[{ required: true, message: "Please enter your Last name" }]}
            style={{ width: "50%" }}
          >
            <Input
              prefix={<UserOutlined />}
              type="text"
              placeholder="Last name"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        {/* contact number */}
        <div>
          <Form.Item
            name="contact-number"
            rules={[{ required: true, message: "Please enter your contact number" }]}
          // style={{ width: "50%" }}
          >
            <Input
              prefix={<PhoneOutlined />}
              type="number"
              placeholder="Contact number"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        {/* location */}
        <div>
          <Form.Item
            name="location"
            rules={[{ required: true, message: "Please enter your Location" }]}
          // style={{ width: "50%" }}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              type="text"
              placeholder="Location"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          block
          style={{ backgroundColor: "#1E73BE", color: "white", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold" }}
        >
          Save changes
        </Button>
      </Form>




      {/* update modal button */}
      <Button type="primary" onClick={showModal} style={{ backgroundColor: "#E9F1F9", color: "#1E73BE", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold", width: "100%", margin: "30px 0px" }}>
        Update password form here
      </Button>







      {/* update password change modal */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        width={600}
        okText="Update password"
        okButtonProps={{
          style: { width: "100%", backgroundColor: "#1b69ad", padding: "24px", color: "#FFFFF", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", margin: "10px 0", }, // OK button style
        }}
        // cancel button display none
        cancelButtonProps={{
          style: { display: "none" },
        }}
      >
        {/* update password */}
        <Form form={passwordForm} layout="vertical" onFinish={handleUpdatePassword}>
          <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Update password</h1>

          {/* Current password */}
          <div>
            <p className="font-roboto">Current password</p>
            <Form.Item
              name="current-password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Current password',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Enter your current passowrd" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>

          {/* New passowrd */}
          <div>
            <p className="font-roboto">new password</p>
            <Form.Item
              name="new-password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Enter your new passowrd" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>

          {/* Confirm passowrd */}
          <div>
            <p className="font-roboto">confirm password</p>
            <Form.Item
              name="confirm-password"
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm password!',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Enter your confirm passowrd" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardPersonalInformation;