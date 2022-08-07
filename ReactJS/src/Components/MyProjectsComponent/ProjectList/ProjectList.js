import { useEffect, useState } from "react";

import styles from "./ProjectList.module.css";

import ListSelector from "../../ListSelector/ListSelector";
import { AppstoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import SelectColumnsMenu from "../../MenuSelectColumns/MenuSelectColumns";
import TableTasks from "../../TableTasks/TableTasks";


const ProjectList = (props) => {
  const [list, setList] = useState("- All Lists -");
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    setLoading(false);
    console.log(props);
  });

  const handleChangeList = (list) => {
    setList(list);
  };

  const handleViewTask = (task) => {
    console.log("View task", task);
  };

  const handleEditStatusTask = (task, newStatus) => {
    console.log("Edit Status", task, newStatus);
    return true;
  };

  const handleEditTask = (task) => {
    console.log("Edit task", task);
  };

  const handleDeleteTask = (task) => {
    console.log("Delete", task);
  };

  return (
    <>
      <div className={styles.listSubnav}>
        <div>
          <ListSelector handleChangeList={(list) => handleChangeList(list)} />
        </div>

        <div className={styles.groupControl}>
          <Popover
            content={
              <SelectColumnsMenu />
            }
            trigger="click"
            placement="bottomLeft"
          >
            <AppstoreOutlined className={styles.icon} />
          </Popover>
        </div>
      </div>

      <TableTasks
        loading = {loading}
        handleViewTask={handleViewTask}
        handleEditTask={handleEditTask}
        handleEditStatusTask={handleEditStatusTask}
        handleDeleteTask={handleDeleteTask}
      ></TableTasks>

    </>
  );
};



export default ProjectList;
