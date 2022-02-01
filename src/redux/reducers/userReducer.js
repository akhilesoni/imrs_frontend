import { ADD_USER, SET_USER } from "../constants/action-types"

const initialState = {
    users:[]
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_USER:
            return {
                ...state,
                users:[...state.users,action.payload]
            }
        case SET_USER:
            return {
                ...state,
                users:action.payload
        }
        default:
            return state
    }
}

export default userReducer;