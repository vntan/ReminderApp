import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../Models/accountReducer";
import { useNavigate } from "react-router-dom";

import styles from "./MainPage.module.css";
import "./MainPageGlobal.css";

import { Layout, Menu, Avatar, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import MyTasksComponent from "../../Components/MyTasksComponent/MyTasksComponent.js";
import MyProjectsComponent from "../../Components/MyProjectsComponent/MyProjectsComponent.js";

const { Header, Content } = Layout;

const MainPage = ({ state, logout }) => {
  const navigate = useNavigate();

  const [isMyTasks, setIsMyTasks] = useState(true);

  const showMyTasks = () => {
    setIsMyTasks(true);
  };

  const showMyProject = () => {
    setIsMyTasks(false);
  };

  const showInformation = () => {
    console.log("Show information");
  }

  const handleLogout = () => {
    console.log("Log out");
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <div onClick={showInformation}><UserOutlined /> User Information</div>,
        },
        {
          key: "2",
          label: <div onClick={handleLogout}><LogoutOutlined /> Sign out</div>,
        },
      ]}
    />
  );

  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <Dropdown overlay={menu} trigger='click'>
          <div className={styles.profile}>
            <Avatar
              size={48}
              src="https://www.partyanimalsgame.com/static/avatars-07_Carrot.png"
              style={{ marginRight: "8%" }}
            />
            {true && "Carrot"}
          </div>
          </Dropdown>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["my-tasks"]}
            className={styles.menu}
            items={[
              { label: "My tasks", key: "my-tasks", onClick: showMyTasks },
              {
                label: "Projects",
                key: "my-projects",
                style: { marginLeft: "20%" },
                onClick: showMyProject,
              },
            ]}
          />
        </Header>
        <Content></Content>
      </Layout>
      {isMyTasks && <MyTasksComponent />}
      {!isMyTasks && <MyProjectsComponent />}
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
