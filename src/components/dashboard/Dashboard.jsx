import AdminPage from "../../pages/admin/AdminPage"
import { ADMIN, TOKEN, URL, USER } from "../../utilities/Constants"
import ClientPage from "../../pages/client/ClientPage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUsers } from "../../redux/actions/userActions"
export default function Dashboard(){
    const user = JSON.parse(localStorage.getItem(USER))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=> {
        fetch(URL + 'users',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                dispatch(setUsers(data.users))
            }else{
                navigate('/')
            }
        })
    },[])
    return (
        <div className="dashboard">
            {user.usertype === ADMIN ? <AdminPage/> : <ClientPage/>}
        </div>
    )
}