import { combineReducers } from 'redux';
import invoiceReducer from './invoiceReducer';
import loadingReducer from './loadingReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    users:userReducer,
    invoices:invoiceReducer,
    loading:loadingReducer
})

export default rootReducer;