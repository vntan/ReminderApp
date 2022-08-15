import { useEffect, useState } from "react";

import styles from "./ProjectList.module.css";

import ListSelector from "../../ListSelector/ListSelector";
import { AppstoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import SelectColumnsMenu from "../../MenuSelectColumns/MenuSelectColumns";
import TableTasks from "../../TableTasks/TableTasks";

import { connect } from "react-redux";
import { getTasks } from "../../../Models/tasksReducer";


const ProjectList = (props) => {
  const [list, setList] = useState(-1);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    setLoading(true);
    
    props.getTasks(props.idAccount, () => {
      setLoading(false);
      console.log("Task:", props.tasks);
    });
  }, [props.projectID, list]);

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
          <ListSelector
            handleChangeList={(list) => handleChangeList(list)}
            projectID={props.projectID}
          />
        </div>

        <div className={styles.groupControl}>
          <Popover
            content={
              <SelectColumnsMenu columnsTableDisable={["Action", "Task"]} />
            }
            trigger="click"
            placement="bottomLeft"
          >
            <AppstoreOutlined className={styles.icon} />
          </Popover>
        </div>
      </div>

      <TableTasks
        tasks={
          props.tasks &&
          props.tasks
            .filter((item) => {
              if (props.projectID === -1 && list === -1) return true;
              else {
                if (props.projectID > -1 && list === -1)
                  return item.taskInfo.idProject === props.projectID;
                else
                  return (
                    item.taskInfo.idProject === props.projectID &&
                    item.taskInfo.idList === list
                  );
              }
            })
            .map((item) => {
              const obj = {
                ...item.taskInfo,
                participant: item.participant,
                notificationList: item.notification,
                subtask: item.subtask,
                tag: item.tag,
              };
              return obj;
            })
        }
        loading={loading}
        handleViewTask={handleViewTask}
        handleEditTask={handleEditTask}
        handleEditStatusTask={handleEditStatusTask}
        handleDeleteTask={handleDeleteTask}
      ></TableTasks>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    idAccount: state.account.account.idAccount,
    tasks: state.taskReducer.tasks,
  };
};

const mapActionToProps = {
  getTasks,
};

export default connect(mapStateToProps, mapActionToProps)(ProjectList);
