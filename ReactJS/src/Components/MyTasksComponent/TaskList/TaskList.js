import styles from "./TaskList.module.css";

import Table from "react-bootstrap/Table";
import TableRow from "../TableRow/TableRow";

import {connect} from 'react-redux'

import {getTasks} from '../../../Models/tasksReducer'
import { useEffect } from "react";

const TaskList = ({columnsTable, idAccount, tasks, getTasks}) => {


  useEffect(()=>{
    getTasks(idAccount);
    console.log(tasks);
  }, []);


  const handleViewTask = (task) => {
    console.log("View task", task);
  };

  const handleEditStatus = (task, newStatus) => {
    console.log("Edit Status", task, newStatus);
  };

  const handleEditTask = (task) => {
    console.log("Edit task", task);
  };

  const handleDelete = (task) => {
    console.log("Delete", task);
  };


  return (
    <Table className={styles.tableList} hover>
      <thead className={styles.tableHeader}>
        <tr>
          {
            columnsTable.map((columns, index) => {
              return (
                <th style={{...columns.style, display: columns.isVisible ? "": "none" }} key={index} >{columns.nameColumns}</th>
              );
            })
          }

        </tr>
      </thead>
      <tbody>
        {
        tasks &&
        tasks.map((task, index) => {
          return (
            <TableRow
              handleViewTask={handleViewTask}
              handleEditStatus={handleEditStatus}
              handleEditTask={handleEditTask}
              handleDelete={handleDelete}
              key={index}
              task={task}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state)=>{
    return {
        columnsTable: state.columnsListTask,
        idAccount: state.account.account.idAccount,
        tasks: state.taskReducer.taskInfo
    }
}

const mapActionToProps = {
    getTasks,
}


export default connect(mapStateToProps, mapActionToProps)(TaskList);
