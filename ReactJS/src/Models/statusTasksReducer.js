import { createSlice } from '@reduxjs/toolkit'
import { completeColor, onGoingColor, toDoColor } from '../Utilities/Color';


/* initial state */
const initialState = [
    { nameStatus: "To do", isVisible: true, style: {color: toDoColor} },
    { nameStatus: "On going", isVisible: true, style: {color: onGoingColor} },
    { nameStatus: "Complete", isVisible: true, style: {color: completeColor} },
]

//Reducer
const statusTaskSlice = createSlice({
    name: 'statusTask',
    initialState: initialState,
    reducers: {
        updateVisibleStatus(state, action){
            for(const status of state) status.isVisible = false;

            for(const nameStatus of action.payload.statusVisible){
                const index = state.findIndex(status => status.nameStatus === nameStatus)
                if (index >= 0 ) state[index].isVisible = true;
            }
            
        },

        updateStylestatus(state, action){
            const index = state.findIndex((status)=>{
                return status.nameStatus = action.payload.nameStatus;
            })

            if (index > 0) state[index].style = action.payload.style;
        },
    }
});


export const { updateVisibleStatus, updateStyleStatus } = statusTaskSlice.actions




export default statusTaskSlice.reducer;


