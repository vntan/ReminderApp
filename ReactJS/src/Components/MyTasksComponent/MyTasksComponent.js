import styles from "./MyTasksComponent.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Menu, Popover, Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import SelectColumnsMenu from "../MenuSelectColumns/MenuSelectColumns";

import { useState } from "react";
import CreateTask from "../TaskCommon/CreateTask/CreateTask";


const MyTasksComponent = () => {
  const [showCreateTask, setShowCreateTask] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const [columnsTable, setColumnsTable] = useState([]);


  const menuTasksView = [
    {
      label: "List",
      key: "list",
      onClick: () => navigate("list"),
    },
    {
      label: "Calendar",
      key: "calendar",
      onClick: () => navigate("calendar"),
    },
  ];

  const selectedKey = () => {
    const url = location.pathname.toLowerCase();

    for (const item of menuTasksView)
      if (url.includes(item.key.toLowerCase())) return item.key;

    return "";
  };

  const handleAddTask = () => {
    setShowCreateTask(true)
    console.log("Add Task");
  };

  const closeCreateTask = () => {
    setShowCreateTask(false)
  }

  const addNewTask = (taskInfo) => {
    // Call api
    setShowCreateTask(false)
    console.log('Add new task: ', taskInfo)
  }

  return (
    <>
      <div className={styles.subnav}>
        <Menu
          theme="light"
          mode="horizontal"
          className={styles.menu}
          selectedKeys={[selectedKey()]}
          items={menuTasksView}
        />
        <div className={styles.groupControl}>
          <Popover
            content={
              <SelectColumnsMenu
                columnsTable={columnsTable}
                updateVisibleColumns={(columnsTable) => { setColumnsTable([...columnsTable]) }}
              />
            }
            trigger="click"
            placement="bottomLeft"
          >
            <AppstoreOutlined
              className={styles.icon}
              style={{ display: selectedKey() !== "list" ? "none" : "" }}
            />
          </Popover>
        </div>
      </div>

      <Outlet context={[columnsTable, setColumnsTable]} />


      <div className={styles.button} onClick={handleAddTask}>
        <span>+</span>
      </div>

      {showCreateTask && <CreateTask
        showCreateTask={showCreateTask}
        closeCreateTask={closeCreateTask}
        addNewTask={addNewTask}
      />}
    </>
  );
};

export default MyTasksComponent;
