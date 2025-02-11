import { EnvironmentOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, } from "antd";
import axios from "axios";
import { useState } from "react";

const DashboardPersonalInformation = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);

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

  const handleUpload = ({ fileList }) => {
    if (fileList.length > 1) {
      message.error("You can only upload one image!");
      return;
    }
    setFileList(fileList);
  };


  const handleSaveChange = async (values) => {
    const formData = new FormData();

    // Append image file
    if (fileList && fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    formData.append("first-name", values["first-name"]);
    formData.append("last-name", values["last-name"]);
    formData.append("contact", values["contact-number"]);
    formData.append("location", values["location"]);




    
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    })



    form.resetFields();
      setFileList([]);
    // This function is called when the update password form is submitted
    console.log("Updated  Values: ", values);
    // try {
    //   const response = await axios.post('/url', formData);

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


        {/* upload image */}
        <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-2 p-4">
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
            rules={[
              {
                required: true,
                message: "Please upload an image!",
              },
            ]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              onChange={handleUpload}
              fileList={fileList}>

              {fileList.length >= 1 ? null : (
                <div style={{ textAlign: "center"}}>
                  <UploadOutlined style={{ fontSize: 24,}} />
                  <div>Upload photo</div>
                </div>
              )}

            </Upload>
          </Form.Item>
        </div>


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