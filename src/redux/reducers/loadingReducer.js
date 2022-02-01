import { SET_LOADING } from "../constants/action-types";

const initialState = {
    loading:false
}

const loadingReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LOADING:
            return {
                loading:action.payload
        }
        default:
            return state
    }
}

export default loadingReducer;