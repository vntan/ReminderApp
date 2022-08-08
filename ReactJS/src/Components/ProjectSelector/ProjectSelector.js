import styles from "./ProjectSelector.module.css";

import { useEffect } from "react";

import { Select } from "antd";


import { connect } from "react-redux";

import { useState } from "react";

import { getAllProject } from "../../Models/projectReducer";

const { Option } = Select;


const ProjectSelector = (props) => {
  const userID = props.account.idAccount

  useEffect(() => {
    console.log('my project')
    props.getAllProject({userID})
  },[])
  const handleOnChange = (value) => {
    if (props.handleChangeProject) props.handleChangeProject(value);
  };

  return (
    <Select
      className={styles.project}
      onChange={(value) => {
        handleOnChange(value);
      }}
      defaultValue={-1}
      showArrow={false}
      bordered={false}
      size="large"
    >
      <Option value={-1} style={{ textAlign: "center" }}>
        - All Projects -
      </Option>
      {
          props.project && props.project.map((value,key) => {
            return (<Option value={props.project[key].idProject} key={key} style={{ textAlign: "center" }}>
                      {value.name}
                    </Option>)
          })
      }
    </Select>
  );
};

const mapStateToProps = (state) => {
  return {
    project: state.project.listProject,
    account: state.account.account
  }
}

const mapActionToProps = {
  getAllProject
}


export default connect(mapStateToProps,mapActionToProps)(ProjectSelector)
