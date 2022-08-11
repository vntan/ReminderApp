import styles from "./ProjectSelector.module.css";

import { useEffect } from "react";

import { Select } from "antd";


import { connect } from "react-redux";

import { useState } from "react";

import { getAllProject } from "../../Models/projectReducer";
import { startTransition } from "react";

import { resetList } from "../../Models/listReducer";

const { Option } = Select;


const ProjectSelector = (props) => {
  const userID = props.account.idAccount
  const [selectedName, setSelectedName] = useState("- All Projects -")

  useEffect(() => {
    props.getAllProject({userID})
  },[])

  useEffect(()=>{
    if (props.projectSelector.length > 0)
      setSelectedName(props.projectSelector[0].name)
    else{
      setSelectedName("- All Projects -")
    }

  }, [props.project])
  
  const handleOnChange = (value) => {
    if (value != -1) {
      setSelectedName(props.project[value].name)
      value = props.project[value].idProject
    }
    else if(value == -1){
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
    >
      <Option value={-1} style={{ textAlign: "center" }}>
        - All Projects -
      </Option>
      {
          props.project && props.project.map((value,key) => {
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


export default connect(mapStateToProps,mapActionToProps)(ProjectSelector)
