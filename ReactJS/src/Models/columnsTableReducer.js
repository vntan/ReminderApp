import { createSlice, current } from '@reduxjs/toolkit'

import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import StatusSelector from "../Components/StatusSelector/StatusSelector";
import { Space } from 'antd';


/* initial state */
const initialState =  []

//Reducer
const columnsTableSlice = createSlice({
    name: 'columnsTable',
    initialState: initialState,
    reducers: {
        resetColumns(state, action){
            state.push(...action.payload);
        },

        updateVisibleColumns(state, action){
            
            for (const col of state) col.isVisible = false;
                
            for(const nameColumns of action.payload){
                
                const index = state.findIndex(columns => {
                    // console.log(columns,nameColumns)
                    return columns.title === nameColumns
                })
                
                if (index >= 0 ) state[index].isVisible = true;
            }
            
        },
    }
});


export const { resetColumns, updateVisibleColumns } = columnsTableSlice.actions




export default columnsTableSlice.reducer;


