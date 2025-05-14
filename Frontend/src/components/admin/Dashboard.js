import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Table, Row, Col } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [data, setData] = useState([]);

  const handleDataView = async () => {
    try {
      const res = await axios.get("http://localhost:3005/viewdashboard");
      if (res.data.success)
        setDashboardData(res.data.data);
      else toast.error("Failed to fetch dashboard data.");
    }
    catch (error) {
      toast.error("Error fetching dashboard data.");
    }
  };

  const handleTableView = async () => {
    try {
      const res = await axios.get("http://localhost:3005/viewtopuser");
      if (res.data.success)
        setData(res.data.data);
      else
        toast.error("Failed to fetch users.");
    } catch (error) {
      toast.error("Error fetching user data.");
    }
  };

  useEffect(() => {
    handleDataView();
    handleTableView();
  }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "User_Image",
      dataIndex: "profil",
      render: (text, record) =>
        record.photo ? (
          <img src={record.photo} alt="User" style={{ width: "50px", height: "50px" }} />
        ) : (
          <img src="download.png" alt="Default User" style={{ width: "50px", height: "50px" }} />
        ),
    },
    { title: "First_name", dataIndex: "f_name", key: "f_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Created_at",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div className="wrapper">
      <AdminHeader />
      <SideMenu />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Dashboard</h1>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={6}>
                <div className="card" style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                  <div className="card-body" >
                    <h5 className="card-title" style={{ fontSize: "20px" }}>Total Users</h5>
                    <p className="card-text" style={{ fontSize: "30px" }}>{dashboardData.viewUsers}</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6}>
                <div className="card" style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "20px" }}>Total Products</h5>
                    <p className="card-text" style={{ fontSize: "30px" }}>{dashboardData.viewProduct}</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6}>
                <div className="card" style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "20px" }}>Total Categories</h5>
                    <p className="card-text" style={{ fontSize: "30px" }}>{dashboardData.viewCategory}</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6}>
                <div className="card" style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "20px" }}>Total Contacts</h5>
                    <p className="card-text" style={{ fontSize: "30px" }}>{dashboardData.viewContacts}</p>
                  </div>
                </div>
              </Col>
            </Row>
            <div style={{ fontSize: "35px", borderBottom: "5px solid blue", fontWeight: "bold" }}>
              Top 5 Users
            </div>
            <Table dataSource={data} bordered columns={columns} scroll={{ x: 800 }} pagination={false} />
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
}
