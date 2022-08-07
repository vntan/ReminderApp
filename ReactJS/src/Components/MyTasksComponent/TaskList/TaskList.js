import { connect } from 'react-redux'

import { getTasks } from '../../../Models/tasksReducer'
import { useEffect, useState } from "react";

import TableTasks from "../../TableTasks/TableTasks";

const TaskList = ({ idAccount, tasks, getTasks }) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTasks(idAccount, () => {
      setLoading(false);
    });

    console.log(tasks);

  }, []);

  
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
    <TableTasks
      tasks={tasks}
      loading={loading}
      handleViewTask={handleViewTask}
      handleEditTask={handleEditTask}
      handleEditStatusTask={handleEditStatusTask}
      handleDeleteTask={handleDeleteTask}
    ></TableTasks>
  );
};

const mapStateToProps = (state) => {
  return {
    idAccount: state.account.account.idAccount,
    tasks: state.taskReducer.taskInfo
  }
}

const mapActionToProps = {
  getTasks,
}


export default connect(mapStateToProps, mapActionToProps)(TaskList);
