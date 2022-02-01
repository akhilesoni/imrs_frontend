import { Link } from "react-router-dom";
import "../../style/dashboardStyle/side_nav_bar.css"
import { useState } from "react";

export default function SideNav(props){
    const [state, setState] = useState({
        drawerOpen:false,
        cover:false
    })
    const toggleDrawer = () => {
        setState({
            drawerOpen:!state.drawerOpen,
            cover:!state.cover
        })
    }

    return (
        <div className="side-nav-wrapper">
            <div onClick={toggleDrawer} className={state.cover ? "side-cover": "none"}></div>
            <div onClick={toggleDrawer} className="hambar">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
            </div> 
            <div onClick={toggleDrawer} className={state.drawerOpen ? "side-nav" : "side-nav-close"}>
                <p className="logo">
                    IMRS 
                </p>
                <div className="side-menu">
                    {props.links.map(link =>(
                        <Link to={link.link} className={"side-menu-item"}>
                            <div className="link-wrapper">
                                <p className="side-menu-link">{link.title}</p>
                                <img className="menu-icon" src={link.icon} alt="icon" />
                            </div>
                        </Link>
                    ))}
                </div> 
                <div className="bottom-side">
                    <p>IMRS | 2022</p>
                </div>
            </div>
        </div>
    )
}