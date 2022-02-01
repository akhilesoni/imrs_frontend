import { SET_INVOICE } from "../constants/action-types"

const initialState = {
    invoices:[]
}

const invoiceReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_INVOICE:
            return {
                ...state,
                invoices:action.payload
        }
        default:
            return state
    }
}

export default invoiceReducer;