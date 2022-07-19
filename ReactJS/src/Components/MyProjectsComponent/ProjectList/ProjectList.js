import { useState } from "react";

import styles from "./ProjectList.module.css";
import '../../../Helper/DisableResponsive.css'

import ListSelector from "../../ListSelector/ListSelector";
import TableRow from "../TableRow/TableRow";
import { FilterOutlined } from "@ant-design/icons";
import Table from "react-bootstrap/Table";

import { useOutletContext } from "react-router-dom";

const ProjectList = () => {
  const handleFilter = () => {
    console.log("Filter");
  };

  const project = useOutletContext();

  const [list, setList] = useState("- All Lists -");

  const handleChangeList = (list) => {
    setList(list);
  };

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
      deadline: "02/05/2022",
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
    <>
      <div className={styles.listSubnav}>
        <div>
          <ListSelector handleChangeList={(list) => handleChangeList(list)} />
        </div>
        <div onClick={handleFilter} className={styles.filter}>
          <FilterOutlined style={{ verticalAlign: "middle" }} />
        </div>
      </div>
      <Table className={styles.tableList} hover>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th className="tablet">Notification</th>
            <th>Status</th>
            <th className="mobile">Assignees</th>
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
    </>
  );
};

export default ProjectList;
