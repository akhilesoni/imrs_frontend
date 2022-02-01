import LoginForm from "../components/auth/LoginForm"
import HomeIcon from "../icons/home.svg"
import SettingIcon from "../icons/setting.svg"
import AddIcon from "../icons/add.svg"
import UsersIcon from "../icons/users.svg"
import InvoiceIcon from "../icons/invoice.svg"
import issueMessageIcon from "../icons/issueMessage.svg"
import RequestMoneyIcon from "../icons/requestmoney.svg"

import CustomerIcon from "../icons/customer.svg"
import AdminDashboard from "../pages/admin/AdminDashboard"
import Invoices from "../pages/admin/Invoices"
import AddInvoice from "../pages/admin/AddInvoice"
import AddUser from "../pages/admin/AddUser"
import Users from "../pages/admin/Users"
import InvoicePage from "../pages/InvoicePage"
import IssuePage from "../pages/IssuePage"
import RequestPage from "../pages/RequestPage"
import ProfilePage from "../pages/ProfilePage"

export const AdminLinks = [
    {
        title:'Overview',
        link:'',
        nested:false,
        icon:HomeIcon
    },
    {
        title:'Invoices',
        link:'invoices',
        nested:false,
        icon:InvoiceIcon
    },
    {
        title:'Customers',
        link:'customers',
        nested:false,
        icon:CustomerIcon
    },
    {
        title:'System Users',
        link:'system_users',
        nested:false,
        icon:UsersIcon
    },
    {
        title:'Issues',
        link:'issues',
        nested:false,
        icon:issueMessageIcon
    },
    {
        title:'Requests',
        link:'requests',
        nested:false,
        icon:RequestMoneyIcon
    }
   
    
]

export const AdminRoutes = [
    {
        path:'',
        component:<AdminDashboard/>
    },
    {
        path:'invoices',
        component:<Invoices/>
    },
    {
        path:'customers',
        component:<Users usertype={"client"} title={"Customers"}/>
    },
    {
        path:'system_users',
        component:<Users usertype={"admin"} title={"System Users"}/>
    },
    {
        path:'invoices/add_invoice',
        component:<AddInvoice/>
    },
    {
        path:'customers/add_user',
        component:<AddUser/>
    },
    {
        path:'system_users/add_user',
        component:<AddUser/>
    },
    {
        path:'invoices/:id',
        component:<InvoicePage/>
    },
    {
        path:'issues',
        component:<IssuePage/>   
    },
    {
        path:'requests',
        component:<RequestPage/>   
    },
    {
        path:'users/:id',
        component:<ProfilePage/>   
    },
]