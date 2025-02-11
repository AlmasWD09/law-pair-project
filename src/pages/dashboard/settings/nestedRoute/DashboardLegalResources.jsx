import { Button, Form, Input, Table } from "antd";
import { useState } from "react";

const DashboardLegalResources = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([
    { id: 1, image: "",title: "Dhaka",   name: "John", },
    { id: 2, image: "", title: "Fulbaria",  name: "Kamal", },
    { id: 3, image: "", title: "Asim",  name: "Monir", },
  ]);


  const columns = [
    { key: "1", title: "Image", dataIndex: "image", responsive: ["xs", "sm", "md", "lg", "xl"] },
    { key: "2", title: "Title", dataIndex: "title", responsive: ["xs", "sm", "md", "lg", "xl"] },
    { key: "3", title: "Name", dataIndex: "name", responsive: ["xs", "sm", "md", "lg", "xl"] },

  ];


  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <div>
        <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">Legal resources</h1>
        <p className="fontro text-[#B6B6BA] text-[12px] pb-3">Admin can add legal resources</p>
      </div>



      <Form form={form} >
        {/* upload */}
        <div className="py-10">
          <h1 className="text-2xl ">Upload image fiele here...</h1>
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