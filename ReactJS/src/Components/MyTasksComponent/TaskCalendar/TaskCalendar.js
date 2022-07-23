import { useState } from "react";

import styles from "./TaskCalendar.module.css";
import {
  completeColor,
  onGoingColor,
  toDoColor,
} from "../../../Utilities/Color";

import { Button, Calendar } from "antd";
import Alert from "react-bootstrap/Alert";

import moment from "moment";

const TaskCalendar = () => {
  const tasks = [
    {
      taskname: "Học",
      deadline: "08/08/2022",
      status: "Complete",
    },
    {
      taskname: "Kiểm thử sản phẩm",
      deadline: "01/05/2022",
      notification: "30/04/2022",
      status: "On going",
      project: "Project 1",
      subtask: "3/5",
    },
    {
      taskname: "Phát triển sản phẩm",
      deadline: "02/05/2022",
      notification: "29/04/2022",
      status: "To do",
      project: "Project 1",
      list: "List 1",
      subtask: "0/3",
    },
  ];

  const statusToColor = {
    Complete: completeColor,
    "On going": onGoingColor,
    "To do": toDoColor,
  };

  const [value, setValue] = useState(moment());
 
  const onSelect = (newValue) => {
    setValue(newValue);
  };

  const handleOnClickTask = (e, task) => {
    e.stopPropagation();
    console.log('on Click', task);
  };

  const handleAddTask = () => {
    console.log('Add Task');
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getListData = (value) => {
    const filteredTasks = tasks.filter(
      (task) => task.dueDate === value.format("DD/MM/YYYY")
    );
    return filteredTasks;
  };

  const dateCellRender = (value) => {
    const listTask = getListData(value);
    if (listTask.length > 0) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {listTask.map((task) => {
            return (
              <Alert
                key={task.idTask}
                className={styles.alert}
                style={{ backgroundColor: statusToColor[task.status] }}
                onClick={(e) => handleOnClickTask(e, task)}
              >
                {task.name}
              </Alert>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div >
      <div className={styles.calendar}>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}

        />

      </div>
      <Button className={styles.button} onClick={handleAddTask}>+</Button>
    </div>
  );
};

export default TaskCalendar;
