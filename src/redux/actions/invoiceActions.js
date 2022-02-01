import { SET_INVOICE } from "../constants/action-types"

export const setInvoices = (invoices) => {
    return {
        type:SET_INVOICE,
        payload:invoices
    }
}   
