import styles from "./List.module.css";

import ListSelector from "../../ListSelector/ListSelector";

import { FilterOutlined } from "@ant-design/icons";

import Table from "react-bootstrap/Table";

import Row from "../Row/Row";

const List = () => {
  const handleFilter = () => {
    console.log("Filter");
  };

  return (
    <>
      <div className={styles.listSubnav}>
        <div>
          <ListSelector />
        </div>
        <div onClick={handleFilter} className={styles.filter}>
          <FilterOutlined />
        </div>
      </div>
      <Table className={styles.tableList} hover>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Notification</th>
            <th>Status</th>
            <th>Assignees</th>
            <th>Subtask</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <Row
            task="Tìm hiểu kiến thức"
            deadline="18/07/2022"
            status="On going"
            assignees={[
              "https://www.partyanimalsgame.com/static/avatars-04_Machitto.png",
              "https://www.partyanimalsgame.com/static/avatars-01_Underbite.png",
              "https://www.partyanimalsgame.com/static/avatars-08_Otter.png",
              "https://www.partyanimalsgame.com/static/avatars-11_Unicorn.png",
              "https://www.partyanimalsgame.com/static/avatars-10_Crocodile.png"
            ]}
          />
          <Row
            task="Kiểm thử sản phẩm"
            deadline="01/05/2022"
            notification="30/04/2022"
            status="Complete"
            assignees={[
              "https://www.partyanimalsgame.com/static/avatars-07_Carrot.png",
              "https://www.partyanimalsgame.com/static/avatars-01_Underbite.png",
              "https://www.partyanimalsgame.com/static/avatars-08_Otter.png",
              "https://www.partyanimalsgame.com/static/avatars-11_Unicorn.png",
              "https://www.partyanimalsgame.com/static/avatars-10_Crocodile.png"
            ]}
            subtask="3/5"
          />
          <Row
            task="Phát triển sản phẩm"
            deadline="02/05/2022"
            notification="29/04/2022"
            status="To do"
            assignees={[
              "https://www.partyanimalsgame.com/static/avatars-07_Carrot.png",
              "https://www.partyanimalsgame.com/static/avatars-01_Underbite.png",
              "https://www.partyanimalsgame.com/static/avatars-08_Otter.png",
              "https://www.partyanimalsgame.com/static/avatars-11_Unicorn.png",
              "https://www.partyanimalsgame.com/static/avatars-10_Crocodile.png"
            ]}
            subtask="0/3"
          />
        </tbody>
      </Table>
    </>
  );
};

export default List;
