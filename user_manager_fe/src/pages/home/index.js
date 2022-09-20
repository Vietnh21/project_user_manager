import React, { useEffect, useState } from "react";
import usersService from "../../services/useService";
import { toast } from "react-toastify";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Table, Space, Popconfirm, Modal, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UserManager = () => {
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);

  if (localStorage.getItem("user") === null) {
    navigate("/");
  }

  const handleLogout = () => {
    var loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      localStorage.removeItem("user");
      navigate("/");
      toast.success("Sign out successful!");
    }
  };

  useEffect(() => {
    loadDataUser();
  }, []);

  const loadDataUser = () => {
    usersService.getListUsers().then((res) => {
      setDataUser(res);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = (id) => {
    usersService.deleteUsers(id).then((res) => {
      loadDataUser();
      toast.success("Delete User successful!");
    });
  };

  const createUser = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataUser.length + 1,
    });
    setVisible(true);
  };

  const openModal = (id) => {
    usersService.getIdUsers(id).then((res) => {
      res.map((x) =>
        formModal.setFieldsValue({
          id: x.id,
          name: x.name,
          age: x.age,
          address: x.address,
        })
      );
    });
    setVisible(true);
  };

  const onFinish = (values) => {
    const index = dataUser.findIndex((item) => item.id === values.id);
    if (values.age > 100 || values.age < 1) {
      toast.error("Age invalid!");
      setVisible(true);
    } else {
      if (index > -1) {
        usersService.updateUsers(values.id, values).then((res) => {
          loadDataUser();
          toast.success("Edit User successful!");
        });
      } else {
        usersService.createUsers(values).then((res) => {
          loadDataUser();
          toast.success("Create User successful!");
        });
      }
      handleCancel();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      width: 150,

      render: (text, record) => (
        <Space size="middle">
          <button
            className="custom-btn btn-action"
            onClick={() => {
              openModal(record.id);
            }}
          >
            Edit
          </button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <button className="custom-btn btn-action">Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="content">
      <h1 className="page-title">User Manager</h1>

      <button className="bn632-hover bn25" onClick={handleLogout}>
        <RiLogoutBoxRFill className="icon-logout" />
      </button>

      <div className="center">
        <div className="btn">
          <button className="bn632-hover bn21" onClick={createUser}>
            Create User
          </button>
        </div>

        <Table columns={columns} dataSource={dataUser} />
      </div>

      <Modal
        title="User Manager"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <button
            className="bn632-hover bn21 btn-submit"
            mlType="submit"
            form="formModal"
          >
            Save
          </button>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          form={formModal}
          name="formModal"
          onFinish={onFinish}
        >
          <Form.Item name="id" label="Id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please input age !" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input address !" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default UserManager;
