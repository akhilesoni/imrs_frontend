import { ADD_USER, SET_USER } from "../constants/action-types"

export const addUser = (user) => {
    return {
        type:ADD_USER,
        payload:user
    }
}   

export const setUsers = (users) => {
    return {
        type:SET_USER,
        payload:users
    }
}