import styles from "./TaskList.module.css";

import Table from "react-bootstrap/Table";
import TableRow from "../TableRow/TableRow";

import {connect} from 'react-redux'

const TaskList = ({columnsTable}) => {
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
        {tasks.map((task, index) => {
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
        columnsTable: state.columnsListTask
    }
}


export default connect(mapStateToProps, null)(TaskList);
