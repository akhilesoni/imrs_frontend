import LoginForm from "../components/auth/LoginForm"
import HomeIcon from "../icons/home.svg"
import SettingIcon from "../icons/setting.svg"
import AddIcon from "../icons/add.svg"
import RequestMoneyIcon from "../icons/requestmoney.svg"
import InvoiceIcon from "../icons/invoice.svg"
import issueMessageIcon from "../icons/issueMessage.svg"
import AdminDashboard from "../pages/admin/AdminDashboard"
import Invoices from "../pages/admin/Invoices"
import AddInvoice from "../pages/admin/AddInvoice"
import AddUser from "../pages/admin/AddUser"
import Users from "../pages/admin/Users"
import InvoicePage from "../pages/InvoicePage"
import ClientDashboard from "../pages/client/ClientDashboard"
import IssuePage from "../pages/IssuePage"
import RequestPage from "../pages/RequestPage"

export const ClientLinks = [
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

export const ClientRoutes = [
    {
        path:'',
        component:<ClientDashboard/>
    },
    {
        path:'invoices',
        component:<Invoices/>
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
    }
]