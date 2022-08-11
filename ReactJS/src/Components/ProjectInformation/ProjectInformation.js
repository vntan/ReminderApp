import React, { useEffect, useState } from "react";

import { Form, Input, Button, message, Select, Result, Modal } from "antd";
import {
  UsergroupAddOutlined,
  DeleteFilled,
  UnorderedListOutlined,
  EditFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { Space, Table } from "antd";

import styles from "./ProjectInformation.module.css";

import { editProject, addParticipant,deleteParticipantToProject,deleteProject,leaveProject } from "../../Models/projectReducer";

import { getUserID } from "../../Models/accountReducer";

import { addList, removeList } from "../../Models/listReducer";
import EditList from "../EditList/EditList";



const ProjectInformation = (props) => {
  const { Option } = Select;

  const [formAddParticipant] = Form.useForm();

  const [formAddList] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [nameChange, setNameChange] = useState("");

  const [desChange, setDesChange] = useState("");

  const [isEditName, setIsEditName] = useState(false);

  const [isEditDes, setIsEditDes] = useState(false);

  const [roleUser,setRoleUser] = useState(false)

  useEffect(() => {
     if(props.projectInfo.projectSelect && props.projectInfo.projectSelect.length > 0){
        const role = props.projectInfo.participants.find(value => {
                return value.idUser === props.account.idAccount
              })
        setRoleUser(role.role === "Admin")
     }
  },[props.projectInfo.projectSelect])

  useEffect(()=>{
    formAddParticipant.resetFields();
    formAddList.resetFields();
  }, [props.projectID])

  const showModal = (record) => {
    console.log('record: ',record)
    setRecordList(record)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [recordList, setRecordList] = useState();

  const columns_participant = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "30%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <a className={styles.delete_button}>
            {roleUser === true &&
              <DeleteFilled onClick={() => deleteParticipant(record)} />
            }
          </a>
        </Space>
      ),
    },
  ];

  const columns_list = [
    {
      title: "Name list",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "40%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Count task",
      dataIndex: "Tasks",
      key: "Tasks",
      align: "center",
      width: "20%",
    },
    {
      title: "Task Success",
      dataIndex: "TasksSuccess",
      key: "TasksSuccess",
      align: "center",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <a className={styles.change_name_list}>
          {roleUser === true && <EditFilled
              onClick={() => {
                showModal(record);
              }}
            />}
          </a>
          <a className={styles.delete_button}>
          {roleUser === true &&
            <DeleteFilled
              onClick={() => {
                deleteList(record);
              }}
            />
          }
          </a>
        </Space>
      ),
    },
  ];

  const handleChangeName = () => {
    const userID = props.account.idAccount;
    const projectID = props.projectInfo.projectSelect[0].idProject;
    const nameProject = nameChange;
    const description = props.projectInfo.projectSelect[0].description;

    console.log({ userID, projectID, nameProject, description });

    props.editProject(
      { userID, projectID, nameProject, description },
      (result) => {
        setIsEditName(false);
      }
    );
  };

  const handleChangeDes = () => {
    const userID = props.account.idAccount;
    const projectID = props.projectInfo.projectSelect[0].idProject;
    const nameProject = props.projectInfo.projectSelect[0].name;
    const description = desChange;

    props.editProject(
      { userID, projectID, nameProject, description },
      (result) => {
        setIsEditDes(false);
      }
    );
  };

  const onFinishAddParticipant = (values) => {
    const email = values.Email
    props.getUserID({ email }, (onSuccess, idUserAdd) => {
      console.log(onSuccess, idUserAdd);
      const projectID = props.projectInfo.projectSelect[0].idProject;
      const userIDAdmin = props.account.idAccount;
      const userIDAdd = idUserAdd;
      const role = values.Role;
      props.addParticipant(
      { projectID, userIDAdmin, userIDAdd, role },
      (result) => {
        console.log(result);
        if (result.error === "Can't receive the data") {
          message.error("Email is not exist!!! Please enter again");
        }
        else if(result.error === "This account already in the project"){
          message.error("Participant is already in the project!!!")
        }
        else formAddParticipant.resetFields();

      }
    );
    }
    );
  };

  const deleteParticipant = (record) => {
    console.log(record)
    const projectID = record.idProject
    const userIDAdd = record.idUser
    const role = record.role
    props.deleteParticipantToProject({projectID,userIDAdd,role}, result => {
      console.log(result)
    })
  }

  const onFinishAddList = (values) => {
    const projectID = props.projectInfo.projectSelect[0].idProject;
    const nameList = values.nameList;
    props.addList({ projectID, nameList }, (result) => {
      console.log(result);
      formAddList.resetFields()
    });
  };

  const deleteList = (record) => {
    console.log(record)
    const listID = record.idList;
    props.removeList({ listID }, (result) => {
      console.log(result);
    });
  };

  const removeProject = () => {
    const userID = props.account.idAccount
    const projectID = props.projectInfo.projectSelect[0].idProject;
    props.deleteProject({userID,projectID},cb => {
      console.log(cb)
      props.handleCancel()
    })
  }

  const leaveProject = () => {
    const indexAdmin = props.projectInfo.participants.findIndex(value => {
      return value.role === 'Admin'
    })
    const projectID = props.projectInfo.projectSelect[0].idProject;
    const userIDAdd = props.account.idAccount
    const role = 'User'
    props.leaveProject({projectID,userIDAdd,role}, result => {
      console.log(result)
      props.handleCancel()
    })
  }

  return (
    <div>
      {roleUser ? (<div className={styles.project_information}>
      {isEditName == false ? (
        <div
          className={styles.name_project_text}
          onClick={() => setIsEditName(true)}
        >
          <p>{props.projectInfo.projectSelect.length >0 && props.projectInfo.projectSelect[0].name}</p>
        </div>
      ) : (
        <div
          style={{ width: "calc(100% -24px)" }}
          className={styles.name_project_container}
        >
          <Input
            className={styles.name_project_text}
            type="text"
            defaultValue={
              props.projectInfo.projectSelect.length > 0 && props.projectInfo.projectSelect[0].name
            }
            bordered={false}
            onChange={(evt) => setNameChange(evt.target.value)}
            autoFocus={true}
          />

          <div
            className={styles.buttonChangeName}
            onClick={(value) => handleChangeName(value)}
          >
            <CheckOutlined />
          </div>

          <div
            onClick={() => setIsEditName(false)}
            className={styles.buttonCancelChangeName}
          >
            <CloseOutlined />
          </div>
        </div>
      )}

      {isEditDes == false ? (
        <div
          className={styles.des_project_text}
          onClick={() => setIsEditDes(true)}
        >
          <p>
            {props.projectInfo.projectSelect.length >0 &&
              props.projectInfo.projectSelect[0].description}
          </p>
        </div>
      ) : (
        <div
          style={{ width: "calc(100% -24px)" }}
          className={styles.des_project_container}
        >
          <Input
            className={styles.des_project_text}
            type="text"
            defaultValue={
              props.projectInfo.projectSelect.length >0 &&
              props.projectInfo.projectSelect[0].description
            }
            bordered={false}
            onChange={(evt) => setDesChange(evt.target.value)}
            autoFocus={true}
          />

          <div className={styles.buttonChangeDes} onClick={handleChangeDes}>
            <CheckOutlined />
          </div>

          <div
            onClick={() => setIsEditDes(false)}
            className={styles.buttonCancelChangeDes}
          >
            <CloseOutlined />
          </div>
        </div>
      )}

      <div className={styles.participant} style={{ fontWeight: "bold" }}>
        <UsergroupAddOutlined className={styles.participant_icon} /> Participant
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          form={formAddParticipant}
          name="control-ref"
          onFinish={onFinishAddParticipant}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Form.Item
            name="Email"
            rules={[
              {
                required: true,
                message: "please input email participant",
              },
            ]}
          >
            <Input
              placeholder="Email"
              className={styles.participant_email}
            />
          </Form.Item>
          <Form.Item
            name="Role"
            rules={[
              {
                required: true,
                message: "please choose role for participant",
              },
            ]}
          >
            <Select
              className={styles.participant_role}
              placeholder="Role"
              style={{ width: 400}}
            >
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
        </Form>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.button_add}
          style={{ marginLeft: "16px", transform: "translateY(-12px)" }}
          onClick={()=>formAddParticipant.submit()}
        >
          Add
        </Button>
      </div>

      <Table
        columns={columns_participant}
        style={{ width: 700,marginLeft:'30px' }}
        hideSelect
        pagination={false}
        scroll={{
          x: 600,
          y: 300,
        }}
        dataSource={props.projectInfo.participants}
      />

      <div className={styles.list} style={{ fontWeight: "bold" }}>
        <UnorderedListOutlined className={styles.list_icon} /> List
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          form={formAddList}
          name="control-ref"
          onFinish={onFinishAddList}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form.Item
            className={styles.name_list}
            name="nameList"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Add new list" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className={styles.button_add_list}
          >
            Add
          </Button>
        </Form>
      </div>
      <Table
        columns={columns_list}
        style={{ marginTop: 10, width: 700,marginLeft:'30px' }}
        pagination={false}
        scroll={{
          x: 600,
          y: 300,
        }}
        dataSource={props.listOfProject}
      />
      <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Button className={styles.delete_project} onClick={removeProject}>Delete Project</Button>
      </div>

      <Modal
        title="Edit list"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        width={500}
        centered
      >
        <EditList record={recordList} handleCancel={handleCancel} />
      </Modal>
    </div>) : (<div className={styles.project_information}>
        <div
          style={{ width: "calc(100% -24px)" }}
        >
          <div style={{border:'none',fontSize:'30px',fontWeight:'bold',marginBottom:'15px'}}>
            {props.projectInfo.projectSelect.length > 0 && props.projectInfo.projectSelect[0].name}
          </div>
        </div>
        <div
          style={{ width: "calc(100% -24px)" }}
        >
          <div style={{border:'none',fontSize:'20px'}}>
          {props.projectInfo.projectSelect.length > 0 &&
              props.projectInfo.projectSelect[0].description}
          </div>
        </div>


      <div className={styles.participant} style={{ fontWeight: "bold" }}>
        <UsergroupAddOutlined className={styles.participant_icon} /> Participant
      </div>

      <Table
        columns={columns_participant}
        style={{ width: 700,marginLeft:'30px' }}
        hideSelect
        pagination={false}
        scroll={{
          x: 600,
          y: 300,
        }}
        dataSource={props.projectInfo.participants}
      />

      <div className={styles.list} style={{ fontWeight: "bold" }}>
        <UnorderedListOutlined className={styles.list_icon} /> List
      </div>
      
      <Table
        columns={columns_list}
        style={{ marginTop: 10, width: 700,marginLeft:'30px' }}
        pagination={false}
        scroll={{
          x: 600,
          y: 300,
        }}
        dataSource={props.listOfProject}
      />
      <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Button className={styles.delete_project} onClick={leaveProject}>Leave project</Button>
      </div>

    </div>)}
    </div>
  );
};
const mapStateToProps = (state) => ({
  account: state.account.account,
  projectInfo: state.project.projectInfo,
  listOfProject: state.list.listOfProject,
});

const mapActionToProps = {
  editProject,
  addParticipant,
  removeList,
  addList,
  getUserID,
  deleteParticipantToProject,
  deleteProject,
  leaveProject
};

export default connect(mapStateToProps, mapActionToProps)(ProjectInformation);

