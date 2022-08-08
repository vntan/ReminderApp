import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'



const initState = {
    list : null
}

const listSlice = createSlice({
    name: 'list',
    initialState: initState,
    reducers:{
        showListSuccess(state,action){
            state.list = action.payload.data
        },
        addListSuccess(state,action){
        },
        editListSuccess(state,action){
        },
        removeListSuccess(state,action){
        },
        updateList(state,action){
            state.list = action.payload.data
        }
    }
})

const {addListSuccess,editListSuccess,removeListSuccess,showListSuccess,updateList} = listSlice.actions

export const showList = (listInfo) => async dispacth => {
    axios.post('/lists/showList',listInfo)
    .then((res) => {
        if(res.data.onSuccess){
            dispacth(showListSuccess({data:res.data.result}))
        }
    })
    .catch(function(error){
        console.log(error)
    })
}
export const addList = (listInfo,cb) => async dispacth => {
    axios.post('/lists/addListToProject',listInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            return;
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(false);
    });
}

export const editList = (listInfo,cb) => async dispacth => {
    console.log(listInfo)
    axios.post('/lists/editList',listInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            return;
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(false);
    });
}

export const removeList = (listInfo,cb) => async dispacth =>{
    axios.post('/lists/deleteList',listInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            return;
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(false);
    });
}

export const updateListSuccess = listSlice.actions.updateList

export default listSlice.reducer