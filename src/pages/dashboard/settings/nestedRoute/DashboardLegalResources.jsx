import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table, Upload } from "antd";
import { useState } from "react";

const DashboardLegalResources = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([])


  const [dataSource, setDataSource] = useState([
    { id: 1, image: "/legalImage/legal1.png", title: "Dhaka",   name: "John", },
    { id: 2, image: "/legalImage/legal2.png",  title: "Fulbaria",  name: "Kamal", },
    { id: 3, image: "/legalImage/legal3.png",  title: "Asim",  name: "Monir", },
  ]);

  const columns = [
    { key: "1", title: "Image", dataIndex: "image", responsive: ["xs", "sm", "md", "lg", "xl"],render: (image) => <img src={image} alt="User" className="w-12 h-12 object-cover rounded-md" />
  },
    { key: "2", title: "Title", dataIndex: "title", responsive: ["xs", "sm", "md", "lg", "xl"] },
    { key: "3", title: "Name", dataIndex: "name", responsive: ["xs", "sm", "md", "lg", "xl"] },

  ];

  const handleUpload = ({ fileList }) => {
    if (fileList.length > 1) {
      message.error("You can only upload one image!");
      return;
    }
    setFileList(fileList);
  }


  const handleLegalResurce = async (values) => {
    const formData = new FormData();

    // Append image file
    if (fileList && fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    formData.append("title", values.title);
    formData.append("description", values.description);





    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    })

    // try {
    //   const response = await axios.post("url", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });

    //   console.log("Success:", response.data);

    //   form.resetFields();
    //   setFileList([]);

    // } catch (error) {
    //   console.error("Error:", error.response ? error.response.data : error.message);
    // }
  };

  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Legal resources</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can add legal resources</p>
      </div>



      <Form form={form} onFinish={handleLegalResurce}>
        {/* upload image */}
        <div className="flex justify-center border border-[#B6B6BA] rounded-md mb-4 pt-5">
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
                  <div style={{ textAlign: "center" }}>
                    <UploadOutlined style={{ fontSize: 24, }} />
                    <div>Upload photo</div>
                  </div>
                )}

              </Upload>
            </Form.Item>
          </div>


        {/* title */}
        <div className="">
          <p className="font-roboto text-[#41414D] text-[14px]">Title</p>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter your title" }]}
          >
            <Input
              type="text"
              placeholder="Enter title"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}

            />
          </Form.Item>
        </div>

        {/* description */}
        <div className="">
          <p className="font-roboto text-[#41414D] text-[14px]">Description</p>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter your description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter description"
              style={{ border: "1px solid #B6B6BA", padding: "10px" }}
            />
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          block
          style={{ backgroundColor: "#1E73BE", color: "white", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold" }}
        >
          Add
        </Button>
      </Form>


      <div className="py-[40px]">
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Preview update content:</h1>
      </div>

      {/* table components */}
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize:4 }}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default DashboardLegalResources