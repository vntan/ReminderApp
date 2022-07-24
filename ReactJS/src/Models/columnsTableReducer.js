import { createSlice } from '@reduxjs/toolkit'

import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import StatusSelector from "../Components/StatusSelector/StatusSelector";
import { Space } from 'antd';


/* initial state */
const initialState =  [
    // {title: "Task", width: "20%", isVisible: true, dataIndex: "nameTask"},
    // {title: "Deadline", width: "11%", isVisible: true, dataIndex: "dueDate"},
    // {title: "Notification", width: "11%", isVisible: true, dataIndex: "notification"},
    // {title: "Status", width: "8%", isVisible: true, dataIndex: "status", render: (text, record) =>(
    //         <StatusSelector task={record}/>
    // )},
    // {title: "Project", width: "11%", isVisible: true, dataIndex: "nameProject"},
    // {title: "List", width: "11%", isVisible: true, dataIndex: "nameList"},
    // {title: "Assignees", width: "11%", isVisible: true, dataIndex: "assignees"},
    // {title: "Subtask", width: "8%", isVisible: true, dataIndex: "subtasks"},
    // {title: "Action", width: "8%", isVisible: true, render: (_, record) => (
    //     <Space align="center" size="large">
    //         <FormOutlined className={styles.actionElement} onClick={() =>handleEditTask(record)} style={{ paddingRight: '8%' }} />
    //         <DeleteOutlined className={styles.actionElement} onClick={() => handleDelete(record)} />
    //     </Space>
    // )},

]


//Reducer
const columnsTableSlice = createSlice({
    name: 'columnsTable',
    initialState: initialState,
    reducers: {
        updateVisibleColumns(state, action){
            for(const columns of state) columns.isVisible = false;

            for(const nameColumns of action.payload.columnsVisible){
                const index = state.findIndex(columns => columns.nameColumns === nameColumns)
                if (index >= 0 ) state[index].isVisible = true;
            }
            
        },

        updateStyleColumns(state, action){
            const index = state.findIndex((columns)=>{
                return columns.nameColumns = action.payload.nameColumns;
            })

            if (index > 0) state[index].style = action.payload.style;
        },
    }
});


export const { updateVisibleColumns, updateStyleColumns } = columnsTableSlice.actions




export default columnsTableSlice.reducer;


