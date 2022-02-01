import { SET_LOADING } from "../constants/action-types"

export const setLoading = (loading) => {
    return {
        type:SET_LOADING,
        payload:loading
    }
}   
