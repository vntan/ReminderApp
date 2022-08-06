import React, { useEffect, useState } from 'react'

import { Form, Input, Button, message, Select } from 'antd';
import { UsergroupAddOutlined, DeleteFilled,UnorderedListOutlined,EditFilled } from "@ant-design/icons";

import { connect } from 'react-redux';
import { Space, Table } from 'antd';

import styles from "./ProjectInformation.module.css"

// import { changeProjectInformation,addParticipant,removeProject } from '../../Models/projectReducer';
import { addList,editList,removeList } from '../../Models/listReducer';

const ProjectInformation = (props) => {
    const { Option } = Select;
    const formRef = React.createRef();

    const [nameValue,setNameValue]= useState()
    const [description,setDescription]= useState()

    const onFinish = (values) => {
        console.log(values);
        formRef.current.resetFields();
    };
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
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          align : 'center'
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
            <a className={styles.change_name_list}><EditFilled /></a>
              <a className={styles.delete_button}><DeleteFilled /></a>
            </Space>
          ),
        },
      ];

    const data = [];

    for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
    }

    const projectNameChange = (value) => {
        // console.log('Received values of form: ',value );
        // const userID = props.userID
        // const projectID = props.projectID
        // const nameProject = nameValue
        // const description = props.description
        // props.changeProjectInformation({userID,projectID,nameProject,description},(result)=>{
        //     if(result.onSuccess){
        //         message.success('Change name complete!',3)
        //     }
        //     else{
        //         message.error('Can not change name!',3)
        //     }
        // })
    }
    const projectDescriptionChange = (value) => {

    }
    return(
        <div className={styles.project_information}>
            <div>
                <Input className={styles.name_project} type='text' defaultValue={props.nameproject} style={{width:150}} bordered={false} value={nameValue} onChange={(c) => projectNameChange(c.target.value)}/>
                {console.log(props)}
            </div>
            <div>
                <Input className={styles.project_description} defaultValue='Description' style={{width:400}} bordered={false} value={description} onChange={(c) => setDescription(c.target.value)}/>
            </div>
            
            <div className={styles.participant} style={{fontWeight:'bold'}}>
                <UsergroupAddOutlined className={styles.participant_icon} /> Participant
            </div>
            <Form ref={formRef} name="control-ref" onFinish={onFinish}  style={{width:'500px', marginLeft:'200px',display:'flex',flexDirection:'column'}} >
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
            dataSource={data}/>
              <div className={styles.list} style={{fontWeight:'bold'}}>
                <UnorderedListOutlined  className={styles.list_icon} /> List
            </div>
            <Form ref={formRef} name="control-ref" onFinish={onFinish} style={{width:'500px', marginLeft:'200px',display:'flex',flexDirection:'column'}} >
                <Form.Item
                className={styles.name_list}
                name="list"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Input placeholder='Add new list'/>
                </Form.Item>
                <Button type='primary' htmlType="submit" className={styles.button_add_list}>
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
              dataSource={data}/>
            
            <Button className={styles.delete_project}>Delete Project</Button>
        </div>
    )
}
const mapStateToProps = (state) => ({
    project: state.project.project,
    list:state.list.list
});

const mapActionToProps = {
    // changeProjectInformation,
    // addParticipant,
    // addList,
    // editList,
    // removeList,
    // removeProject
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




