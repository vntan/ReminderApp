import { connect } from 'react-redux'

import tasksReducer, { getTasks } from '../../../Models/tasksReducer'
import { useEffect, useState } from "react";

import TableTasks from "../../TableTasks/TableTasks";



const TaskList = ({ idAccount, tasks, getTasks }) => {
  const [showTaskInfo, setShowTaskInfo] = useState(false)
  const [taskCurrent, setTaskCurrent] = useState({})
  const [showEditTask, setShowEditTask] = useState(false)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTasks(idAccount, () => {
      setLoading(false);
      console.log("Task:", tasks)
    });

  }, []);



  const handleViewTask = (task) => {
    setTaskCurrent(task)
    setShowTaskInfo(true)
    console.log("View task", task);
  };

  const handleEditStatusTask = (task, newStatus) => {
    console.log("Edit Status", task, newStatus);
    return true;
  };

  const handleDeleteTask = (task) => {
    console.log("Delete", task);
  };

  const closeTaskInfo = () => {
    setShowTaskInfo(false)
  }

  const closeEditTask = () => {
    setShowEditTask(false)
  }

  const handleSaveTask = (task) => {
    setShowEditTask(false)
    console.log('Call API update task: ', task)
  }

  return (
    <>
      {/* {console.log("Task return: ", tasks.map(item => {
        return item.taskInfo
      }))} */}
      <TableTasks
        tasks={tasks && tasks.map(item => {
          const obj = {
            ...item.taskInfo,
            participant: item.participant,
            notificationList: item.notification,
            subtask: item.subtask,
            tag: item.tag
          }
          return obj
        })}
        loading={loading}
        handleViewTask={handleViewTask}
        handleEditStatusTask={handleEditStatusTask}
        handleDeleteTask={handleDeleteTask}
      ></TableTasks>

      {/* {showTaskInfo &&
        <TaskInfo
          showTaskInfo={showTaskInfo}
          closeTaskInfo={closeTaskInfo}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          task={taskCurrent}
        />} */}

      {/* {showEditTask &&
        <EditTask
          showEditTask={showEditTask}
          closeEditTask={closeEditTask}
          // saveTask={handleSaveTask}
          task={taskCurrent}
          tasks={tasks && tasks[tasks.findIndex(item => item.taskInfo.idTask === taskCurrent.idTask)]}
        />
      } */}
    </>

  );
};

const mapStateToProps = (state) => {
  return {
    idAccount: state.account.account.idAccount,
    tasks: state.taskReducer.tasks
  }
}

const mapActionToProps = {
  getTasks,
}


export default connect(mapStateToProps, mapActionToProps)(TaskList);
