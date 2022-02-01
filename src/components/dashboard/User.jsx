import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from '../../utilities/avatar';
import "../../style/componentStyle/user.css"
import { useNavigate } from 'react-router-dom';
export default function User(props){
    const user = props.user
    const navigate = useNavigate()

    const handleViewProfile = () => {
        navigate('/home/users/'+user.id)
    }
    return (
        <div className={props.type === 'H' ? 'user-card-h' :'user-card'} >
            <Avatar
                className={props.type === 'H' ? 'user-profile-h':'user-profile'}
                avatarStyle='Circle'
                {...generateRandomAvatarOptions() }
                    />
            <div style={{margin:'0 10px'}}>
                <p style={{margin:'10px 0 5px 0'}}>{user.name}</p>
                <p style={{color:'var(--dark_grey)',fontSize:'14px'}}>{user.email}</p>
            </div>
            <p onClick={handleViewProfile} className="user-blue-button">View Profile</p>
        </div>
    )
}