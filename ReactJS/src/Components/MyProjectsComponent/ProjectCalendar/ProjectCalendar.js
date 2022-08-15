import { useState, useEffect } from "react";

import styles from "./ProjectCalendar.module.css";
import {
  completeColor,
  onGoingColor,
  toDoColor,
} from "../../../Utilities/Color";

import { Calendar, Spin } from "antd";
import Alert from "react-bootstrap/Alert";

import moment from "moment";
import { connect } from "react-redux";

import { getTasks } from "../../../Models/tasksReducer";
import CreateTask from "../../TaskCommon/CreateTask/CreateTask";

const ProjectCalendar = ({ tasks, idAccount, getTasks, projectID }) => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTasks(idAccount, () => {
      setLoading(false);
      console.log(tasks);
    });
  }, []);

  const statusToColor = {
    Complete: completeColor,
    "On going": onGoingColor,
    "To do": toDoColor,
  };

  const [value, setValue] = useState(moment());

  const onSelect = (newValue) => {
    setValue(newValue);
  };

  const handleClickTask = (task) => {
    //On Click The Task
  };

  const handleAddTask = () => {
    setShowCreateTask(true);
    console.log("Add Task");
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getListData = (listTasks, value) => {
    const taskInProject = listTasks.filter((item) => {
      if (projectID === -1) return true;
      else return item.taskInfo.idProject === projectID;
    });

    const filteredTasks = taskInProject.filter((task) => {
      return (
        new moment(task.taskInfo.dueDate).utc().format("DD/MM/YYYY") ===
        value.format("DD/MM/YYYY")
      );
    });
    return filteredTasks;
  };

  const dateCellRender = (value) => {
    const listTask = tasks && getListData(tasks, value);

    if (listTask && listTask.length > 0) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {listTask.map((task) => {
            return (
              <Alert
                key={task.idTask}
                className={styles.alert}
                style={{ backgroundColor: statusToColor[task.taskInfo.status] }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickTask(task);
                }}
              >
                {task.taskInfo.name}
              </Alert>
            );
          })}
        </div>
      );
    }
  };

  const monthCellRender = (value) => {
    const listTask =
      tasks &&
      tasks
        .filter((item) => {
          if (projectID === -1) return true;
          else return item.taskInfo.idProject === projectID;
        })
        .filter((item) => {
          const date = moment(item.taskInfo.dueDate).utc();
          return date.month() === value.month() && date.year() === value.year();
        });

    if (listTask && listTask.length > 0) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {listTask.map((task) => {
            return (
              <Alert
                key={task.idTask}
                className={styles.alert}
                style={{ backgroundColor: statusToColor[task.taskInfo.status] }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickTask(task);
                }}
              >
                {task.taskInfo.name}
              </Alert>
            );
          })}
        </div>
      );
    }
  };

  const closeCreateTask = () => {
    setShowCreateTask(false);
  };

  const addNewTask = (taskInfo) => {
    // Call api
    setShowCreateTask(false);
    console.log("Add new task: ", taskInfo);
  };

  return (
    <div>
      {" "}
      {console.log("render", tasks)}
      {loading ? (
        <Spin
          size="large"
          style={{
            width: "35px",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <>
          <div className={styles.calendar}>
            <Calendar
              value={value}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
            />
          </div>

          <div className={styles.button} onClick={handleAddTask}>
            <span>+</span>
          </div>
        </>
      )}
      {showCreateTask && (
        <CreateTask
          showCreateTask={showCreateTask}
          closeCreateTask={closeCreateTask}
          addNewTask={addNewTask}
        />
      )}
    </div>
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

export default connect(mapStateToProps, mapActionToProps)(ProjectCalendar);
