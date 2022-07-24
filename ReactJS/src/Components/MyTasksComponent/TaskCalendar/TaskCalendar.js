import { useEffect, useState } from "react";

import styles from "./TaskCalendar.module.css";
import {
  completeColor,
  onGoingColor,
  toDoColor,
} from "../../../Utilities/Color";

import { Button, Calendar, Spin } from "antd";
import Alert from "react-bootstrap/Alert";

import moment from "moment";
import { connect } from "react-redux";

import { getTasks } from '../../../Models/tasksReducer'


const TaskCalendar = ({ tasks, idAccount, getTasks }) => {

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    
    getTasks(idAccount, () => {
      setLoading(false);
    });
    
    console.log(tasks);
  }, []);

  const statusToColor = {
    "Complete": completeColor,
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
    console.log('Add Task');
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getListData = (listTasks, value) => {
    const filteredTasks = listTasks.filter(
      (task) => {
        return (new moment(task.dueDate, "DD/MM/YYYY").format("DD/MM/YYYY")) === value.format("DD/MM/YYYY")
      }
    );
    return filteredTasks;
  };

  const dateCellRender = (value) => {

    const listTask = tasks && getListData(tasks, value);


    if (listTask && listTask.length > 0) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {

            listTask.map((task) => {
              return (
                <Alert
                  key={task.idTask}
                  className={styles.alert}
                  style={{ backgroundColor: statusToColor[task.status] }}
                  onClick={(e) => { e.stopPropagation(); handleClickTask(task) }}
                >
                  {task.nameTask}
                </Alert>
              );
            })}
        </div>
      );
    };
  }

  return (
    <div >
      {
        loading ? <Spin size="large" style={{
          width: "35px", position: "absolute", left: "50%", top: "50%",
          "transform": "translate(-50%, -50%)",
        }} /> :
          <>
            <div className={styles.calendar}>
              <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}

              />

            </div>
            
            <div className={styles.button} onClick={handleAddTask}>
              <span>+</span>
            </div>
          </>
      }
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    idAccount: state.account.account.idAccount,
    tasks: state.taskReducer.taskInfo,
  }
}

const mapActionToProps = {
  getTasks,
}


export default connect(mapStateToProps, mapActionToProps)(TaskCalendar);
