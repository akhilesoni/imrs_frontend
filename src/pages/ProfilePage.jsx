import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { setLoading } from "../redux/actions/loadingActions";
import { TOKEN, URL } from "../utilities/Constants";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '../utilities/avatar';
import "../style/dashboardStyle/profile.css"

export default function ProfilePage(){
    const param = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        name:'',
        email:'',
        phone:'',
        company:''
    })
    const fetchUserData = () => {
        dispatch(setLoading(true))
        fetch(URL + 'users/'+param.id,{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                setUser(data.user)
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })
    }
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <div className="profile-panel">
            <div className="basic-info">
                <Avatar
                    style={{ width: '100px', height: '100px' ,margin:'20px 0'}}
                    avatarStyle='Circle'
                    {...generateRandomAvatarOptions() }
                        />
                <p className="name">{user.name}</p>
                <p className="email">{user.email}</p>
            </div>
            <div className="profile-info">
                <div>
                    <p>Phone <span>{user.phone}</span></p>
                    <p>Address <span>{user.address}</span></p>
                </div>
                <div>
                    <p>Company <span>{user.company}</span></p>
                </div>
            </div>
        </div>
    )
}