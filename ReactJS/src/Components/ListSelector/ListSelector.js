import styles from "./ListSelector.module.css";

import { Select } from "antd";

import { connect } from "react-redux";
import { useEffect } from "react";

import { showList } from "../../Models/listReducer";
import { useState } from "react";

const { Option } = Select;

const ListSelector = (props) => {

  const userID = props.account.idAccount
  const projectID = props.projectID
  const [listSelection, setListSelection] = useState("- All Lists -")

  useEffect(() => {
    props.showList({ userID })
    setListSelection("- All Lists -");
  }, [props.projectID])


  const handleOnChange = (value) => {
    setListSelection(value);
    if (props.handleChangeList) props.handleChangeList(value);
  }



  return (
    <>
      <Select
        showSearch
        className={styles.list}
        onChange={(value) => {
          handleOnChange(value);
        }}
        defaultValue={"- All Lists -"}
        value={listSelection}
        bordered={false}
        size='large'
      >
        <Option
          key={-1}
          value="- All Lists -"
          style={{ textAlign: "center" }}
        >
          - All Lists -
        </Option>
        {
          props.list && props.list.map((value, key) => {
            if (props.list[key].idProject === projectID) {
              return (<Option value={props.list[key].idList} key={key} style={{ textAlign: "center" }}>
                {value.name}
              </Option>)
            }
          })
        }

      </Select>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    list: state.list.listOfProject
  }
}

const mapActionToProps = {
  showList,
}

export default connect(mapStateToProps, mapActionToProps)(ListSelector);
