import { useState } from "react";

import styles from "./TaskCalendar.module.css";
import {
  completeColor,
  onGoingColor,
  toDoColor,
} from "../../../Utilities/Color";

import { Calendar } from "antd";
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
  const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const handleOnClick = () => {
    console.log(Math.random());
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getListData = (value) => {
    const filteredTasks = tasks.filter(
      (task) => task.deadline == value.format("DD/MM/YYYY")
    );
    return filteredTasks;
  };

  const dateCellRender = (value) => {
    const listTask = getListData(value);
    if (listTask.length > 0) {
      return (
        <div onClick={handleOnClick} style={{ width: "100%", height: "100%" }}>
          {listTask.map((task, index) => {
            return (
              <Alert
                key={index}
                className={styles.alert}
                style={{ backgroundColor: statusToColor[task.status] }}
              >
                {task.taskname}
              </Alert>
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
      />
    </>
  );
};

export default TaskCalendar;
