
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import styles from "./EditList.module.css"

import { Form,Input,Button } from 'antd';

import { editList } from '../../Models/listReducer';

const EditList = (props) => {
    const [formChangeName] = Form.useForm();

    useEffect(() => {
        formChangeName.setFieldsValue({list_name:props.record.name})
    },[props.record.name])

    const onFinish = (value) => {
        const nameList = value.list_name
        const listID = props.record.idList
        props.editList({listID,nameList},result => {
            console.log(result)
            formChangeName.resetFields()
            props.handleCancel()
        })
    }
    const buttonCancel = () => {
        formChangeName.resetFields()
        props.handleCancel()
    }

  return (
    <div >
       <Form form={formChangeName}  name="control-ref" onFinish={onFinish}  >

                <Form.Item
                name='list_name'
                className={styles.container}
                rules={[
                    {
                    required: true,
                    message:'Please input new name for list'
                    },
                ]}
                >
                    <Input type='text'  className={styles.inputNewNameList} />
                   
                </Form.Item>
                <Form.Item>
                     <Button type='primary' htmlType="submit" className={styles.buttonSubmitNameList}>
                        Change List Name
                    </Button>
                    <Button className={styles.buttonCancel} onClick={buttonCancel}>
                    Cancel
                </Button>
                </Form.Item>
                
        </Form>
    </div>
    
  )
}

const mapStateToProps = (state) => ({
    list: state.list.listOfProject,

});

const mapActionToProps = {
    editList
}

export default connect(mapStateToProps,mapActionToProps)(EditList)
