import styles from "./MyTasksComponent.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Menu, Popover, Button } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import { useNavigate, useLocation, Outlet } from "react-router-dom";
import SelectColumnsMenu from "../MenuSelectColumns/MenuSelectColumns";

import { useState } from "react";
import CreateTask from "../TaskCommon/CreateTask/CreateTask";

import TaskList from "./TaskList/TaskList";
import TaskCalendar from "./TaskCalendar/TaskCalendar";

import { updateVisibleColumns } from "../../Models/columnsTableReducer";
import { connect } from "react-redux";

const MyTasksComponent = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [columnsTable, setColumnsTable] = useState([]);


  const menuTasksView = [
    {
      label: "List",
      key: "list",
      component: <TaskList />,
      onClick: () => navigate("list"),
    },
    {
      label: "Calendar",
      key: "calendar",
      component: <TaskCalendar />,
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
          style={{ minWidth: 0, flex: "auto" }}
        />
        <div className={styles.groupControl}>
          <Popover
            content={
              <SelectColumnsMenu columnsTable={props.columnsTable}
                         updateVisibleColumns={props.updateVisibleColumns}/>
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
          
      <Outlet></Outlet>

      {
          menuTasksView.find(menu => menu.key === selectedKey()) ?
            menuTasksView.find(menu => menu.key === selectedKey()).component 
            : null
      }


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

const mapStateToProps = (state) => {
  return {
      columnsTable: state.columnsTable,
  }
}

const mapActionToProps = {
  updateVisibleColumns,
}

export default connect(mapStateToProps, mapActionToProps)(MyTasksComponent);
