import { connect } from 'react-redux'

import { getTasks } from '../../../Models/tasksReducer'
import { useEffect, useState } from "react";

import TableTasks from "../../TableTasks/TableTasks";

import TaskInfo from '../../TaskCommon/TaskInformaion/TaskInfo';
import EditTask from '../../TaskCommon/EditTask/EditTask'

const TaskList = ({ idAccount, tasks, getTasks }) => {
  const [showTaskInfo, setShowTaskInfo] = useState(false)
  const [taskCurrent, setTaskCurrent] = useState({})
  const [showEditTask, setShowEditTask] = useState(false)

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);

    getTasks(idAccount, () => {
      setLoading(false);
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

  const handleEditTask = (task) => {
    setShowTaskInfo(false);
    setTaskCurrent(task)
    setShowEditTask(true)
    console.log("Edit task", task);
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
      <TableTasks
        // tasks={tasks}
        loading={loading}
        handleViewTask={handleViewTask}
        handleEditTask={handleEditTask}
        handleEditStatusTask={handleEditStatusTask}
        handleDeleteTask={handleDeleteTask}
        defaultHideColumns={["Assignees", "Subtasks"]}
      ></TableTasks>

      {/* {showTaskInfo &&
        <TaskInfo
          showTaskInfo={showTaskInfo}
          closeTaskInfo={closeTaskInfo}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          task={taskCurrent}
        />}

      {showEditTask &&
        <EditTask
          showEditTask={showEditTask}
          closeEditTask={closeEditTask}
          saveTask={handleSaveTask}
          task={taskCurrent}
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
