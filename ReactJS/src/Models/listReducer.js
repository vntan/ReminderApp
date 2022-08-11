import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'



const initState = {
    listOfProject: [],
    list: []
}

const listSlice = createSlice({
    name: 'list',
    initialState: initState,
    reducers:{
        showListSuccess(state,action){
            state.list = action.payload.data
        },
        addListSuccess(state,action){
            state.listOfProject = action.payload.data
        },
        editListSuccess(state,action){
            let index = -1
            index = state.listOfProject.findIndex(value => {
                return value.idList === action.payload.data.listID
            })
            if(index > -1){
                state.listOfProject[index].name = action.payload.data.nameList
            }
        },
        removeListSuccess(state,action){
            let index = -1
            index = state.listOfProject.findIndex(value => {
                return value.idList === action.payload.listID
            })
            if(index > -1){
                state.listOfProject.splice(index,1)
            }
        },
        updateList(state,action){
            console.log(action.payload)
            state.listOfProject = action.payload.data
        },
        resetListOfProject(state,action){
            state.listOfProject = []
        }
    }
})

const {addListSuccess,editListSuccess,removeListSuccess,showListSuccess, updateList,showLIstToProjectSucess,resetListOfProject} = listSlice.actions

export const showList = (listInfo) => async dispatch => {
    axios.post('/lists/showList',listInfo)
    .then((res) => {
        if(res.data.onSuccess){
            dispatch(showListSuccess({data:res.data.result}))
        }
    })
    .catch(function(error){
        console.log(error)
    })
}
export const addList = (listInfo,cb) => async dispatch => {
    axios.post('/lists/addListToProject',listInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            console.log(listInfo)
            dispatch(addListSuccess({data:res.data.result}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(false);
    });
}

export const editList = (listInfo,cb) => async dispatch => {
    console.log(listInfo)
    axios.post('/lists/editList',listInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            dispatch(editListSuccess({data:listInfo}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(false);
    });
}

export const removeList = (listInfo,cb) => async dispatch =>{
    axios.post('/lists/deleteList',listInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            dispatch(removeListSuccess({listID:listInfo.listID}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(false);
    });
}

export const addListFromProject = (listInfo) => dispatch => {
    console.log(listInfo)
    dispatch(updateList({data:listInfo}))
}

export const resetList = () => dispatch => {
    dispatch(resetListOfProject())
}


export default listSlice.reducer