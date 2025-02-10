import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd"
import { key } from "localforage";
import { useState } from "react";

const AddCategories = () => {
  const [form] = Form.useForm(); // Form instance

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'John',
      address: "Dhaka"
    },
    {
      id: 2,
      name: 'Kamal',
      address: "Fulbaria"
    },
    {
      id: 3,
      name: 'Monir',
      address: "Asim"
    },
  ])
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name"
    },
    {
      key: "3",
      title: "Address",
      dataIndex: "address"
    },
    {
      key: "4",
      title: "Action",
      render: (record) => {
        return <>
          <EditOutlined />
          <DeleteOutlined
            onClick={() => handleDeleteCategorie(record)}
            style={{ color: "red", margin: "12px" }} />
        </>
      }
    },
  ]

  const handleDeleteCategorie = (record) => {
    setDataSource(prev=>{
      return prev.filter(categorie => categorie.id !== record.id)
    })
  }
  return (
    <div className="bg-[#FFFFFF] p-4 rounded-lg">
      <div>
        <h1 className="font-roboto text-[40px] font-bold text-[#10101E]">Add categories</h1>
        <p className="fontro text-[#B6B6BA] text-[12px]">Admin can add categories</p>
      </div>


      <div>

        <Form>


          <div>
            <p className="font-roboto text-[#41414D] texy-[14px]">Categories name</p>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please enter your categorie name" },
              ]}
            >
              <Input type="text" placeholder="Enter title" style={{ border: "1px solid #B6B6BA", padding: "10px" }} />
            </Form.Item>
          </div>

          <Button htmlType="submit" block style={{ backgroundColor: "#1E73BE", color: "white", fontFamily: "Roboto", padding: "24px", fontSize: "16px", fontWeight: "bold" }}>Add</Button>
        </Form>
      </div>

      <div>
        <h1 className="font-roboto text-[32px] font-bold text-[#10101E] pt-[40px]">Preview update content:</h1>

        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  )
}

export default AddCategories