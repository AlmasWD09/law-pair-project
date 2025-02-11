
import { DeleteOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table, Modal } from "antd";
import Upload from "antd/es/upload/Upload";
import { useState } from "react";

const AddCategories = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    { id: 1, name: "John", image: "/legalImage/legal1.png" },
    { id: 2, name: "Kamal", image: "/legalImage/legal2.png" },
    { id: 3, name: "Monir", image: "/legalImage/legal3.png" },
    { id: 4, name: "John", image: "/legalImage/legal1.png" },
    { id: 5, name: "Kamal", image: "/legalImage/legal2.png" },
    { id: 6, name: "Monir", image: "/legalImage/legal3.png" },
  ]);

  const columns = [
    { key: "1", title: "Image", dataIndex: "image", responsive: ["xs", "sm", "md", "lg", "xl"], render: (image) => <img src={image} alt="User" className="w-12 h-12 object-cover rounded-md" /> },

    { key: "2", title: "Name", dataIndex: "name", responsive: ["xs", "sm", "md", "lg", "xl"] },

    {
      key: "4",
      title: "Action",
      responsive: ["xs", "sm", "md", "lg", "xl"], // Mobile & Tablet Responsive
      render: (record) => (
        <div className="flex gap-2 items-center">
          {/* <EditOutlined className="text-blue-500 cursor-pointer text-lg" /> */}
          <Button type="primary" danger onClick={() => showDeleteModal(record)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [fileList, setFileList] = useState(null)

  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDeleteCategorie = () => {
    setDataSource((prev) => prev.filter((categorie) => categorie.id !== selectedRecord.id));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleUpload = (info) => {
    setFileList([...info.fileList || []]);
  }


  const handleCategorie = async (values) => {
    const formData = new FormData();

    // Append image file
    if (fileList && fileList.length > 0) {
      formData.append("image", fileList[0].originFileObj);
    }

    formData.append("name", values.name);




    
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
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Add categories</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can add categories</p>
      </div>

      {/* Form */}
      <div className="pt-3">
        <Form form={form} onFinish={handleCategorie}>

          {/* upload image */}
          <div>
            <p className="font-roboto text-[#41414D] text-[14px]">Upload</p>
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
              beforeUpload={() => false} onChange={handleUpload} fileList={fileList}>
                <Button size="large" icon={<UploadOutlined />}>Upload Categorie Image</Button>
              </Upload>
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto text-[#41414D] text-[14px]">Categories name</p>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your category name" }]}
            >
              <Input
                type="text"
                placeholder="Enter title"
                className="border border-[#b6b6ba83] px-3 py-2 w-full"
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
      </div>

      {/* Preview Section */}
      <h1 className="font-roboto text-[20px] md:text-3xl font-bold text-[#10101E] pt-6 ">
        Preview update content:
      </h1>

      <div className="overflow-x-auto pt-3">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 4 }}
          className="w-full"
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDeleteCategorie}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p className="text-lg text-gray-800">Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
};

export default AddCategories;

