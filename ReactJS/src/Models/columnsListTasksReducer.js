import { createSlice } from '@reduxjs/toolkit'


/* initial state */
const initialState = [
    { nameColumns: "Task", isVisible: true, style: {} },
    { nameColumns: "Deadline", isVisible: true, style: {} },
    { nameColumns: "Notification", isVisible: true, style: {} },
    { nameColumns: "Status", isVisible: true, style: {} },
    { nameColumns: "Project", isVisible: true, style: {} },
    { nameColumns: "List", isVisible: true, style: {} },
    { nameColumns: "Subtask", isVisible: true, style: {} },
    { nameColumns: "Action", isVisible: true, style: { width: '4%' } },
]

//Reducer
const columnListTaskSlice = createSlice({
    name: 'columnListTask',
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


export const { updateVisibleColumns, updateStyleColumns } = columnListTaskSlice.actions




export default columnListTaskSlice.reducer;


