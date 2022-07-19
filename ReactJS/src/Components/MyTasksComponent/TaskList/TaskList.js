import styles from "./TaskList.module.css";
import "../../../Helper/DisableResponsive.css";

import Table from "react-bootstrap/Table";
import TableRow from "../TableRow/TableRow";

const TaskList = () => {
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

  const handleViewTask = () => {
    console.log("View task");
  };

  const handleEditStatus = (e) => {
    e.stopPropagation();
  };

  const handleEditTask = (e) => {
    e.stopPropagation();
    console.log("Edit task");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("Delete");
  };

  return (
    <Table className={styles.tableList} hover>
      <thead className={styles.tableHeader}>
        <tr>
          <th>Task</th>
          <th>Deadline</th>
          <th className="tablet">Notification</th>
          <th>Status</th>
          <th className="mobile">Project</th>
          <th className="mobile">List</th>
          <th className="tablet">Subtask</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => {
          return (
            <TableRow
              handleViewTask={() => handleViewTask()}
              handleEditStatus={(e) => handleEditStatus(e)}
              handleEditTask={(e) => handleEditTask(e)}
              handleDelete={(e) => handleDelete(e)}
              key={index}
              task={task}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default TaskList;
