import React from "react";

import styles from "./MainPage.module.css";
import "./MainPageGlobal.css";

import { Layout, Menu, Avatar, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { logout } from "../../Models/accountReducer";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const MainPage = ({ state, logout }) => {
  const navigate = useNavigate();

  const showMyTasks = () => {
    navigate('/mytask', {replace: true});
  };

  const showMyProject = () => {
    navigate('/project', {replace: true});
  };

  const showInformation = () => {
    console.log("Show information");
  };

  const handleLogout = () => {
    console.log("Log out");
  };

  const menu = (
    <Menu
      items={[
        {
          key: "Information",
          label: (
            <div className={styles.inforDiv} onClick={showInformation}>
              <UserOutlined style={{ fontSize: "22px" }} />
              <p style={{ margin: 0, paddingLeft: "10px" }}>User Information</p>
            </div>
          ),
        },
        {
          key: "SignOut",
          label: (
            <div className={styles.inforDiv} onClick={handleLogout}>
              <LogoutOutlined style={{ fontSize: "22px" }} />
              <p style={{ margin: 0, paddingLeft: "10px" }}>Sign out</p>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div style={{width: '24vw', maxWidth: '160px'}}></div>
          <Menu
            theme="light"
            mode="horizontal"
            className={styles.menu}
            items={[
              { label: "My tasks", key: "my-tasks", onClick: showMyTasks },
              {
                label: "Projects",
                key: "my-projects",
                style: { marginLeft: "8%" },
                onClick: showMyProject,
              },
            ]}
          />
          <Dropdown overlay={menu} trigger="click">
            <div className={styles.profile}>
              {true && "Carrot"}
              <Avatar
                size={42}
                src="https://www.partyanimalsgame.com/static/avatars-07_Carrot.png"
                style={{ marginLeft: "8%" }}
              />
            </div>
          </Dropdown>
        </Header>
        <Content></Content>
      </Layout>
      <Outlet/>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

const mapActionToProps = {
  logout,
};

export default connect(mapStateToProps, mapActionToProps)(MainPage);
