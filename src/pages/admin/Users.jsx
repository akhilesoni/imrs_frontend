import AddButton from "../../components/dashboard/AddButton";
import { useDispatch, useSelector } from "react-redux"
import { TOKEN, URL } from "../../utilities/Constants";
import { useNavigate } from "react-router-dom";
import { addUser, setUsers } from "../../redux/actions/userActions";
import { useEffect } from "react";
import "../../style/dashboardStyle/table.css"
import User from "../../components/dashboard/User";


export default function Users(props){
    const navigate = useNavigate();
    const users = useSelector(state => state.users )
    const dispatch = useDispatch()
    const filteredUsers = users.users.filter((user) => {
        return user.usertype === props.usertype
    })
    useEffect(() => {
        fetch(URL + 'users',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(!data.isValid){
                navigate('/')
            }
            console.log(data.users)
            dispatch(setUsers(data.users))
        })
    }, [])
    return (
        <div className="users-panel">
            <div className="panel-header">
                <p className="panel-heading">
                    {props.title}
                </p>
                <AddButton link={'add_user'} title={'Add Customer'}/>
            </div>
            <div className="user-wrapper" style={{display:'flex',flexWrap:'wrap'}}>
            {filteredUsers.map(user => (
                <User  user={user}/>
            ))}
            </div>
        </div>
    )
}