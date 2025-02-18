
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Cookies from "js-cookie";


const ManageUser = () => {
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [data, setData] = useState([]);

console.log(data)
  const token = Cookies.get("adminToken")
  useEffect(() => {
    axiosPublic.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      },
    })
      .then(response => {
        setData(response.data.users.data)
      })
      .catch(error => {
        console.error('Error fetching dashboard all user:', error);
      });
  }, [token,]);

  // const filteredData = data.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.email.toLowerCase().includes(searchText.toLowerCase())
  // );

  const filteredData = data.filter(
    (item) =>
      (item.name && item.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchText.toLowerCase()))
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
      dataIndex: "first_name",
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

      <div style={{ padding: "20px" }} className="">
        <Input.Search
          placeholder="Search by name or email"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16, width: "100%", }}
          size="large"
          inputStyle={{
            padding: "40px",
            outline: "none",
            border: "none", // Removes border
            boxShadow: "none", // Removes Ant Design's default focus effect
          }}
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
