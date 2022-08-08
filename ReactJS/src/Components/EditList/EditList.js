
import React from 'react'
import { connect } from 'react-redux';

import styles from "./EditList.module.css"

import { Form,Input,Button } from 'antd';

import { editList } from '../../Models/listReducer';

const EditList = (props) => {
    const onFinish = (value) => {
        const nameList = value.list_name
        const listID = props.record.listID
        props.editList({listID,nameList},result => {
            console.log(result)
        })
        props.handleCancel()
    }
    const buttonCancel = () => {
        props.handleCancel()
    }

  return (
    <div >
       <Form name="control-ref" onFinish={onFinish}  style={{width:'500px', marginLeft:'200px',display:'flex',flexDirection:'column'}} >
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
                    <Input type='text' defaultValue={props.record.name_list} style={{width:300}} className={styles.inputNewNameList} />
                   
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
    list: state.list.list

});

const mapActionToProps = {
    editList
}

export default connect(mapStateToProps,mapActionToProps)(EditList)
