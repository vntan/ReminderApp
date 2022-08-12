import styles from "./ProjectSelector.module.css";

import { useEffect } from "react";

import { Select, Spin } from "antd";


import { connect } from "react-redux";

import { useState } from "react";

import { getAllProject } from "../../Models/projectReducer";
import { startTransition } from "react";

import { resetList } from "../../Models/listReducer";

const { Option } = Select;


const ProjectSelector = (props) => {
  const userID = props.account.idAccount
  const [selectedName, setSelectedName] = useState("- All Projects -")
  const [loadingProject, setLoadingProject] = useState(false);

  useEffect(() => {
    setLoadingProject(true);
    props.getAllProject({ userID }, () => {
      setLoadingProject(false);
    })
  }, [])

  useEffect(() => {
    if (props.projectSelector.length === 0)
    {
      setSelectedName("- All Projects -")
      if (props.handleChangeProject) props.handleChangeProject(-1);
    }
    else{
      if (props.projectSelector.length > 0 && selectedName != "- All Projects -")
        setSelectedName(props.projectSelector[0].name) 
    }
  }, [props.project])

  const handleOnChange = (value) => {
    if (value != -1) {
      setSelectedName(props.project[value].name)
      value = props.project[value].idProject
    }
    else if (value == -1) {
      setSelectedName("- All Projects -")
      props.resetList()
    }
    if (props.handleChangeProject) props.handleChangeProject(value);
  };

  return (

    <Select
      className={styles.project}
      onChange={(value) => {
        handleOnChange(value);
      }}
      defaultValue={-1}
      value={selectedName}
      showArrow={false}
      bordered={false}
      size="large"
      loading={loadingProject}
    >
      <Option value={-1} style={{ textAlign: "center" }}>
        - All Projects -
      </Option>
    

        {
          props.project && props.project.map((value, key) => {
            return (<Option value={key} key={key} title={value.name} style={{ textAlign: "center" }}>
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
    projectSelector: state.project.projectInfo.projectSelect,
    account: state.account.account

  }
}

const mapActionToProps = {
  getAllProject,
  resetList
}


export default connect(mapStateToProps, mapActionToProps)(ProjectSelector)
