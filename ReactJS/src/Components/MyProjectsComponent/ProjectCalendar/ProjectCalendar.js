import { useState } from "react";

import styles from "./ProjectCalendar.module.css";
import {
  completeColor,
  onGoingColor,
  toDoColor,
} from "../../../Utilities/Color";

import { Calendar } from "antd";
import Alert from "react-bootstrap/Alert";

import moment from "moment";

const ProjectCalendar = () => {
 
  const tasks = [
    {
      taskname: "Tìm hiểu kiến thức",
      deadline: "18/07/2022",
      status: "On going",
      assignees: [
        "https://www.partyanimalsgame.com/static/avatars-04_Machitto.png",
        "https://www.partyanimalsgame.com/static/avatars-01_Underbite.png",
        "https://www.partyanimalsgame.com/static/avatars-08_Otter.png",
        "https://www.partyanimalsgame.com/static/avatars-11_Unicorn.png",
        "https://www.partyanimalsgame.com/static/avatars-10_Crocodile.png",
      ],
    },
    {
      taskname: "Kiểm thử sản phẩm",
      deadline: "01/05/2022",
      notification: "30/04/2022",
      status: "Complete",
      assignees: [
        "https://www.partyanimalsgame.com/static/avatars-07_Carrot.png",
        "https://www.partyanimalsgame.com/static/avatars-01_Underbite.png",
        "https://www.partyanimalsgame.com/static/avatars-08_Otter.png",
        "https://www.partyanimalsgame.com/static/avatars-11_Unicorn.png",
        "https://www.partyanimalsgame.com/static/avatars-10_Crocodile.png",
      ],
      subtask: "3/5",
    },
    {
      taskname: "Phát triển sản phẩm",
      deadline: "01/05/2022",
      notification: "29/04/2022",
      status: "To do",
      assignees: [
        "https://www.partyanimalsgame.com/static/avatars-07_Carrot.png",
        "https://www.partyanimalsgame.com/static/avatars-01_Underbite.png",
        "https://www.partyanimalsgame.com/static/avatars-08_Otter.png",
        "https://www.partyanimalsgame.com/static/avatars-11_Unicorn.png",
        "https://www.partyanimalsgame.com/static/avatars-10_Crocodile.png",
      ],
      subtask: "0/3",
    },
  ];

  const statusToColor = {
    Complete: completeColor,
    "On going": onGoingColor,
    "To do": toDoColor,
  };

  const [value, setValue] = useState(moment());
  //const [selectedValue, setSelectedValue] = useState(moment());

  const onSelect = (newValue) => {
    setValue(newValue);
    //setSelectedValue(newValue);
  };

  const handleOnClickTask = (e, task) => {
    e.stopPropagation();
    console.log('on Click', task);
  };


  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getListData = (value) => {
    const filteredTasks = tasks.filter(
      (task) => task.deadline === value.format("DD/MM/YYYY")
    );
    return filteredTasks;
  };

  const dateCellRender = (value) => {
    const listTask = getListData(value);
    if (listTask.length > 0) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {listTask.map((task, index) => {
            return (
              <Alert
                key={index}
                className={styles.alert}
                style={{ backgroundColor: statusToColor[task.status] }}
                onClick={(e) => handleOnClickTask(e, task)}
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
    <div >
      <div className={styles.calendar}>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}

        />

      </div>
      
    </div>
  );
};

export default ProjectCalendar;
