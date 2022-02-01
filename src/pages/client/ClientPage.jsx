import { Route, Routes } from "react-router-dom";
import Nav from "../../components/dashboard/Nav";
import SideNav from "../../components/dashboard/SideNav";
import { ClientLinks, ClientRoutes } from "../../menus/ClientMenu";

export default function ClientPage(){
    return (
        <div className="client-page">
            <Nav/>
            <div className="side-nav-panel-wrapper">
                <SideNav links={ClientLinks}/>
                <div className="panel">
                    <Routes>
                        {ClientRoutes.map(clientRoute => (
                            <Route path={clientRoute.path} element={clientRoute.component}/>
                            ))}
                    </Routes>
                </div>
            </div>
        </div>
    )
}