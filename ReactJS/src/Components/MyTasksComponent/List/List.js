import styles from "./List.module.css";


import Table from "react-bootstrap/Table";

import Row from "../Row/Row";

const List = () => {

  return (
    <Table className={styles.tableList} hover>
      <thead className={styles.tableHeader}>
        <tr>
          <th>Task</th>
          <th>Deadline</th>
          <th>Notification</th>
          <th>Status</th>
          <th>Project</th>
          <th>List</th>
          <th>Subtask</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <Row task='Học' deadline='08/08/2022' status='Complete'/>
        <Row task='Kiểm thử sản phẩm' deadline='01/05/2022' notification='30/04/2022' status='On going' project='Project 1' subtask='3/5'/>
        <Row task='Phát triển sản phẩm' deadline='02/05/2022' notification='29/04/2022' status='To do' project='Project 1' list='List 1' subtask='0/3'/>


        
      </tbody>
    </Table>
  );
};

export default List;
