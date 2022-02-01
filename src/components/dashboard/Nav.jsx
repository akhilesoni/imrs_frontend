import { Link, useNavigate } from "react-router-dom";
import account_icon from "../../icons/account.svg"
import { TOKEN, USER } from "../../utilities/Constants";
import "../../style/dashboardStyle/nav_bar.css"
import { useState } from "react";
import { useAlert } from "react-alert";
import logoutIcon from "../../icons/logout.svg"
import userIcon from "../../icons/user.svg"
import helpIcon from "../../icons/help.svg"


export default function Nav(props){
    const user = JSON.parse(localStorage.getItem(USER));
    const navigate = useNavigate();
    const alert = useAlert();
    const [menu,setMenu] = useState(false);

    const handleLogout = () => {
        alert.show('Do you want to do this?',{
            title:'Logout',
            closeCopy:'Cancel',
            actions:[
                {
                    copy:"Logout",
                    onClick:()=> {
                       logout()
                    }
                }
            ]
        })
    }

    const logout = () => {
        localStorage.setItem(TOKEN,null);
        localStorage.setItem(USER,null);
        navigate('/')
    }
    return (
        <div className="nav">
            <div className="nav-logo">
                IMRS
            </div>
            <div onClick={() => setMenu(!menu)} className="nav-account-tab">
                <p style={{color:'white',fontSize:'14px',margin:'0 10px 0 0'}}>{user.name}</p>
                <img  src={account_icon} alt="profile" className={menu?"profile-icon-active":"profile-icon"} />
            </div>
            <div className={menu? "menu":"menu-close"}>
                <div className="menu-item">
                    <p className="menu-text">My Account </p>
                    <img className="menu-icon" src={userIcon} alt="" />
                </div>
                <div onClick={handleLogout} className="menu-item">
                    <p className="menu-text">Logout</p>
                    <img className="menu-icon" src={logoutIcon} alt="" />
                    
                </div>
                <div className="menu-item">
                    <p className="menu-text">Help and Support</p>
                    <img className="menu-icon" src={helpIcon} alt="" />
                    
                </div>
            </div>
        </div>
    )
}