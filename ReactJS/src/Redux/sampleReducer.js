/* initial state */
const initialState = {
    data: []
};


/*Define actions */

//Name Action
const ACTION_NAME = "ACTION_NAME";

//Export Action
export const action = () => ({
    //Define type = nameAction
    type: ACTION_NAME,
    //Define data: it will be dispatched by the action
    data: [],
});


/*Define reducer = reduce(state, action) */
const reducerAccount = (state = initialState, action) => {
   
    switch(action.type){

        case ACTION_NAME:
            //return new state using spread operator
            return [
                ...state,
                action.data
            ]
        break;

        default:
            return state;
    }
}

/*Export default Reducer */
export default reducerAccount;