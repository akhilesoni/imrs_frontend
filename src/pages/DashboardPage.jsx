import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Loading from "../components/utilities/Loading";
import { TOKEN, URL, USER } from "../utilities/Constants";

export default function DashboardPage(){
    const [state, setState] = useState({
        isLoading:true
    })
    const navigate = useNavigate()
    useEffect(() => {
        fetch(URL + 'authUser',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                console.log(data.user)
                localStorage.setItem(USER,JSON.stringify(data.user))
                setState({
                    isLoading:false
                })
            }else{
                navigate('/')
            }
        })
    }, []);

    return (
        <div className="dashboard-page">
            {state.isLoading ? <Loading/> : <Dashboard/>}
        </div>
    )
}