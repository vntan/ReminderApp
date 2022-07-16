import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'
import { KEY_ACCOUNT_STATE } from '../Utilities/Constants'


/* initial state */
const initialState = {
    isLogin: false,
    account: null
};

/*
    Action(NameAction, Payload) --> reducer (state = initState, Action)
 */

/* Kiến trúc Redux: Data --> prediction --> ko chấp nhận aync, random..... */

//Reducer
// const accountT = createSlice({
//     name: "AccountLoginIn",
//     initialState: initialState,
//     reducers: {
//             userUpdate(state, action){
//                 state.data = action.data;
//             },
//             //reducer(state, {NameAction: Login, PayloadL actionData})
//             // logIn(state, actionData){
//             //     const user = actionData.user
//             //     // kiểm tra user có tồn tại trên DB
//             //     // axios.post(user). then(....) --> ayncnochrous --> ko cho phép
//             // }
//     }
// })

// const {userUpdate} = accountT.actions
// dispatch(userUpdate({id: 10, name: "NVA"}))


//Question: làm sao để lấy data và đưa nó vào reducer mà ko vi phạm
// Get data -->  dispatch (cập nhật dữ liệu qua action) dữ liệu:
// export const toDo = ({ email, password }) => async dispatch =>{
//     axios.post('/accounts/login', { email, password }). then((response)=>{
//         const data = response;
//         dispatch(userUpdate(data))
//     })
// }


//Reducer
const accountSlice = createSlice({
    name: 'account',
    initialState: JSON.parse(localStorage.getItem(KEY_ACCOUNT_STATE)) || initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLogin = true;
            state.account = action.payload.data;
        },

        registerSuccess(state, action) {
            state.isLogin = true;
            state.account = action.payload.data;
        },

        logoutSuccess(state){
            state.isLogin = false;
            state.account = null;
        },
    }
});


const { loginSuccess, registerSuccess, logoutSuccess } = accountSlice.actions

export const login = ({ email, password }, cb) => async dispatch => {
    axios.post('/accounts/login', { email, password })
        .then((response) => {
            console.log(response.data);
            if (response.data.onSuccess) {
                localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify({ isLogin: true, account: response.data.result[0] }));
                dispatch(loginSuccess({ data: response.data.result[0] }))
            }
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });
}

export const loginGoogle = (userInfo, cb) => async dispatch => {

    axios.post('/accounts/loginGoogle', userInfo)
        .then((response) => {
            console.log(response.data);
            if (response.data.onSuccess) {
                localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify({ isLogin: true, account: response.data.result[0] }));
                dispatch(registerSuccess({ data: response.data.result[0] }))
            }
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });

}

export const register = (userInfo, cb) => async dispatch => {

    axios.post('/accounts/register', userInfo)
        .then((response) => {
            console.log(response.data);
            if (response.data.onSuccess) {
                localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify({ isLogin: true, account: response.data.result[0] }));
                dispatch(registerSuccess({ data: response.data.result[0] }))
            }
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });

}

export const logout =() => async dispatch => {
    localStorage.removeItem(KEY_ACCOUNT_STATE);
    dispatch(logoutSuccess());
};    


export default accountSlice.reducer;


