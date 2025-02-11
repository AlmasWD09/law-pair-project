
import React, { useState } from "react";
import { Table, Input, Button, Modal, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const ManageUser = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [data, setData] = useState([
    { key: "1", name: "Almas Hossain", email: "almas@example.com", role: "Lawyer" },
    { key: "2", name: "Rahim Uddin", email: "rahim@example.com", role: "Client" },
    { key: "3", name: "Karim Mia", email: "karim@example.com", role: "Lawyer" },
    { key: "4", name: "Jabed Islam", email: "jabed@example.com", role: "Client" },
    { key: "5", name: "Tania Rahman", email: "tania@example.com", role: "Lawyer" },
    { key: "6", name: "Sajid Khan", email: "sajid@example.com", role: "Client" },
    { key: "7", name: "Farhana Akter", email: "farhana@example.com", role: "Lawyer" },
    { key: "8", name: "Mehedi Hasan", email: "mehedi@example.com", role: "Client" },
    { key: "9", name: "Sumon Ahmed", email: "sumon@example.com", role: "Lawyer" },
    { key: "10", name: "Nafisa Jahan", email: "nafisa@example.com", role: "Client" },
    { key: "11", name: "Hasan Mahmud", email: "hasan@example.com", role: "Lawyer" },
    { key: "12", name: "Rafiq Ullah", email: "rafiq@example.com", role: "Client" },
    { key: "13", name: "Shamima Nasrin", email: "shamima@example.com", role: "Lawyer" },
    { key: "14", name: "Biplob Kumar", email: "biplob@example.com", role: "Client" },
    { key: "15", name: "Mim Chowdhury", email: "mim@example.com", role: "Lawyer" },
    { key: "16", name: "Sakib Al Hasan", email: "sakib@example.com", role: "Client" },
    { key: "17", name: "Tarek Rahman", email: "tarek@example.com", role: "Lawyer" },
    { key: "18", name: "Anika Sultana", email: "anika@example.com", role: "Client" },
    { key: "19", name: "Jahid Hasan", email: "jahid@example.com", role: "Lawyer" },
    { key: "20", name: "Ruma Akter", email: "ruma@example.com", role: "Client" },
  ]);



  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
  );


  const showDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDeleteUser = () => {
    if (selectedRecord) {
      setData((prev) => prev.filter((item) => item.key !== selectedRecord.key));
      setIsModalVisible(false);
      setSelectedRecord(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          style={{
            borderRadius: "999px", // rounded-full effect
            padding: "3px 15px",
            fontSize: "14px",
            fontWeight: "400",
            color: "white",
            backgroundColor: role === "Lawyer" ? "#96DDCA" : "#EBD298",
            border: "none",
          }}
        >{role}</Tag>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Action",
      key: "action",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (_, record) => (
        <Button type="primary" danger onClick={() => showDeleteModal(record)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg max-w-full">
      <h1 className="font-roboto text-[20px] md:text-[40px] font-bold text-[#10101E]">
        Manage Users
      </h1>
      <p className="fontro text-[#B6B6BA] text-[12px] pb-3">
        Admins can manage users by promoting, demoting, or removing them.
      </p>

      <div style={{ padding: "20px" }}>
        <Input.Search
          placeholder="Search by name or email"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16, width: 300 }}
        />

        <div className="overflow-x-auto pt-3">
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 8 }} />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p className="text-lg text-gray-800">Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default ManageUser;
