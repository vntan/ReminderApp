import React, { useEffect, useState } from 'react'

import { Form, Input, Button, message, Select, Result,Modal } from 'antd';
import { UsergroupAddOutlined, DeleteFilled,UnorderedListOutlined,EditFilled } from "@ant-design/icons";

import { connect } from 'react-redux';
import { Space, Table } from 'antd';

import styles from "./ProjectInformation.module.css"

import { editProject,addParticipant } from '../../Models/projectReducer';

import { addList,removeList,} from '../../Models/listReducer';
import EditList from '../EditList/EditList';



const ProjectInformation = (props) => {
    const { Option } = Select;
    const formRef = React.createRef();

    const [recordList,setRecordList] = useState()

    const columns_participant = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          align : 'center',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'Email',
          align : 'center',
          width: '30%'
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          align : 'center',
          width: '20%'
        },
        {
          title: 'Action',
          key: 'action',
          align : 'center',
          render: (_, record) => (
            <Space size="middle">
              <a className={styles.delete_button}><DeleteFilled /></a>
            </Space>
          ),
        },
      ];

      const columns_list = [
        {
          title: 'Name list',
          dataIndex: 'name_list',
          key: 'name_list',
          align : 'center',
          width:'40%',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Count task',
          dataIndex: 'count_task',
          key: 'count_task',
          align : 'center',
          width:'20%'
        },
        {
          title: 'Task Success',
          dataIndex: 'task_success',
          key: 'task_success',
          align : 'center',
          width:'20%'
        },
        {
          title: 'Action',
          key: 'action',
          align : 'center',
          width:'20%',
          render: (_, record) => (
            <Space size="middle">
            <a className={styles.change_name_list}><EditFilled onClick={() => {setRecordList(record);showModal()}} /></a>
              <a className={styles.delete_button}><DeleteFilled onClick={() => {deleteList(record)} } /></a>
            </Space>
          ),
        },
      ];

    const dataParticipant = [];

    for (let i = 0; i < props.projectInfo.participants.length; i++) {
      dataParticipant.push({
          key: i,
          name: props.projectInfo.participants[i].name,
          email:props.projectInfo.participants[i].email,
          role: props.projectInfo.participants[i].role,
      });
    }

    const dataList = []
    for (let i = 0; i < props.projectInfo.listInformation.length; i++) {
      dataList.push({
          key: i,
          name_list: props.projectInfo.listInformation[i].name,
          count_task:props.projectInfo.listInformation[i].Tasks,
          //task success not in database
          task_success: props.projectInfo.listInformation[i].Tasks,
          listID: props.projectInfo.listInformation[i].idList
      });
      }

    const changeName = (value) => {

        const userID = props.account.idAccount
        const projectID = props.projectInfo.projectInfo[0].idProject
        const nameProject = value
        const description = props.projectInfo.projectInfo[0].description

        props.editProject({userID,projectID,nameProject,description},(result) => {
          console.log(result)
        })
        
    }
    const changeDes = (value) => {

      const userID = props.account.idAccount
      const projectID = props.projectInfo.projectInfo[0].idProject
      const nameProject = props.projectInfo.projectInfo[0].name
      const description = value

      props.editProject({userID,projectID,nameProject,description},(result) => {
        console.log(result)
      })
    }

    const onFinishAddParticipant = (values) => {
      formRef.current.resetFields();
    };
    const onFinishAddList = (values) => {
      formRef.current.resetFields();
      const projectID = props.projectInfo.projectInfo[0].idProject
      const nameList = values.nameList
      props.addList({projectID,nameList},result => {
        console.log(result)
      })
    };

   
    const deleteList = (record) => {
       const listID = record.listID
       props.removeList({listID}, (result) => {
          console.log(result)
       })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {

        setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return(
        <div className={styles.project_information}>
            <div>
                <Input className={styles.name_project} type='text' defaultValue={props.projectInfo && props.projectInfo.projectInfo[0].name} style={{width:500}} bordered={false} onChange={(evt) => changeName(evt.target.value)}/>
            </div>
            <div>
                <Input className={styles.project_description} defaultValue={props.projectInfo && props.projectInfo.projectInfo[0].description} style={{width:400}} bordered={false} onChange={(evt) => changeDes(evt.target.value)}/>
            </div>
            
            <div className={styles.participant} style={{fontWeight:'bold'}}>
                <UsergroupAddOutlined className={styles.participant_icon} /> Participant
            </div>
            <Form ref={formRef} name="control-ref" onFinish={onFinishAddParticipant}  style={{width:'500px', marginLeft:'200px',display:'flex',flexDirection:'column'}} >
                <Form.Item
                className={styles.participant_email}
                name="Email"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Input placeholder='Email' />
                </Form.Item>
                <Form.Item
                name="Role"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Select
                        className={styles.participant_role}
                        placeholder="Role"
                        style={{ width: 400}}
                    >
                        <Option value="Admin" >Admin</Option>
                        <Option value="User">User</Option>
                    </Select>
                </Form.Item>
                    <Button type='primary' htmlType="submit" className={styles.button_add}>
                        Add
                    </Button>
            </Form>
            <Table 
            columns={columns_participant} 
            style={{marginTop:60,width:900,marginLeft:50}} 
            
            hideSelect
            pagination={false} 
            scroll={{
                x: 900,
                y: 300,
              }} 
            dataSource={dataParticipant}/>
              <div className={styles.list} style={{fontWeight:'bold'}}>
                <UnorderedListOutlined  className={styles.list_icon} /> List
                
            </div>
            <Form ref={formRef} name="control-ref" onFinish={onFinishAddList} style={{width:'500px', marginLeft:'200px',display:'flex',flexDirection:'column'}} >
                <Form.Item
                className={styles.name_list}
                name="nameList"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Input placeholder='Add new list'/>
                </Form.Item>
                <Button type='primary' htmlType="submit" className={styles.button_add_list} >
                        Add
                </Button>
            </Form>
            <Table 
            columns={columns_list} 
            style={{marginTop:50,width:900,marginLeft:50}} 
            pagination={false} 
            scroll={{
                x: 900,
                y: 300,
              }} 
              dataSource={dataList}/>
            
            <Button className={styles.delete_project} >Delete Project</Button>

            <Modal title="Edit list" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false} width={1000} centered >
              <EditList record={recordList} handleCancel={handleCancel} />
            </Modal>
        </div>
    )
}
const mapStateToProps = (state) => ({
    account: state.account.account,
    projectInfo: state.project.projectInfo,
    list: state.list.list

});

const mapActionToProps = {
    editProject,
    addParticipant,
    removeList,
    addList
}

export default connect(mapStateToProps,mapActionToProps)(ProjectInformation)
/*
1.làm cho project name và description đứng im đtrong menu
*/


/*
how to lấy data?:
 - Luồng: 
    +xử lí trong lựa chọn project ở trang project
        .Load được thông tin project hiện có (name của project)
        .Nếu là All project thì ẩn nút hiện thông tin project và thêm nút thêm prrohect
            => = all cách lấy được project info
            => Lấy được mới làm tới project info
    +Xử lí project info:
        .Cách lấy thông tin info và participant( thêm, xoá)
        .Lấy tên list cũng như cách xoá, sửa tên

2.tạo project reducer: 
    +Cách tạo:
        .Tạo project chứa thông tin các project
3.tạo lít reducer
4.Vào store add Project reducer, List reducer vào
5. connet redux vào project information
*/




