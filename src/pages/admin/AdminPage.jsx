import "../../style/dashboardStyle/panel.css"
import { Route, Routes } from "react-router-dom"
import Nav from "../../components/dashboard/Nav"
import SideNav from "../../components/dashboard/SideNav"
import { AdminLinks, AdminRoutes } from "../../menus/AdminMenu"
import "../../style/dashboardStyle/panel.css"
import { USER } from "../../utilities/Constants"

export default function AdminPage(){
    const user = JSON.parse(localStorage.getItem(USER))

    return (
        <div className="admin-page">
            <Nav/>
            <div className="side-nav-panel-wrapper">
                <SideNav links={AdminLinks}/>
                <div className="panel">
                    <Routes>
                        {AdminRoutes.map(AdminRoute => (
                            <Route path={AdminRoute.path} element={AdminRoute.component}/>
                            ))}
                    </Routes>
                </div>
            </div>
        </div>
    )
}