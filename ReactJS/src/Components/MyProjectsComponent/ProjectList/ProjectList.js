import { useState } from "react";

import styles from "./ProjectList.module.css";

import ListSelector from "../../ListSelector/ListSelector";
import TableRow from "../TableRow/TableRow";
import { FilterOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Table from "react-bootstrap/Table";

import FilterSelector from "../../FilterSelector/FilterSelector";
import SelectColumnsMenu from "../../MenuSelectColumns/MenuSelectColumns";
import {
  updateVisibleColumns,
  updateStyleColumns,
} from "../../../Models/columnsListProjectProducer";

import { connect } from "react-redux";

const ProjectList = ({ columnsTable, updateVisibleColumns }) => {
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

  const clickFilter = (key) => {
    console.log(key)
  }

  return (
    <>
      <div className={styles.listSubnav}>
        <div>
          <ListSelector handleChangeList={(list) => handleChangeList(list)} />
        </div>

        <div className={styles.groupControl}>
          <Popover
            content={<FilterSelector clickFilter={clickFilter} />}
            trigger="click"
            placement="bottomLeft"
          >
            <FilterOutlined className={styles.icon} />
          </Popover>
          <Popover
            content={
              <SelectColumnsMenu
                columnsTable={columnsTable}
                updateVisibleColumns={updateVisibleColumns}
              />
            }
            trigger="click"
            placement="bottomLeft"
          >
            <AppstoreOutlined className={styles.icon} />
          </Popover>
        </div>
      </div>
      <Table className={styles.tableList} hover>
        <thead className={styles.tableHeader}>
          <tr>
            {columnsTable.map((columns, index) => {
              return (
                <th
                  style={{
                    ...columns.style,
                    display: columns.isVisible ? "" : "none",
                  }}
                  key={index}
                >
                  {columns.nameColumns}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <TableRow
                handleViewTask={handleViewTask}
                handleEditStatus={handleEditStatus}
                handleEditTask={handleEditTask}
                handleDelete={handleDelete}
                key={task.idTask}
                task={task}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    columnsTable: state.columnsListProject,
  };
};

const mapActionToProps = {
  updateVisibleColumns,
  updateStyleColumns,
};

export default connect(mapStateToProps, mapActionToProps)(ProjectList);
