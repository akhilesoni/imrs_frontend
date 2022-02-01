import { useNavigate } from "react-router-dom"
import { ADMIN, TOKEN, URL, USER } from "../utilities/Constants"
import { useState } from "react"
import Request from "../components/dashboard/Request"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/actions/loadingActions"
import notfoundicon from "../icons/notfound.svg"
import historyicon from "../icons/history.svg"
import pendingicon from "../icons/pending.svg"

export default function RequestPage(){
    const dispatch = useDispatch()
    const currentUser = JSON.parse(localStorage.getItem(USER))
    const navigate = useNavigate()
    const [pendingRequests, setPendingRequests] = useState([])
    const [history, setHistory] = useState([])




    const fetchRequests = () => {
        
        var filter = null
        if(currentUser.usertype === ADMIN){
            filter = ADMIN
        }else{
            filter = currentUser.id
        }


        fetch(URL + 'requests',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                filter:filter
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                setPendingRequests(data.requests.filter((request)=>{return !request.accepted}))
                setHistory(data.requests.filter((request)=>{return request.accepted}))
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))
        })
    }
    useEffect(() => {
        dispatch(setLoading(true))
        fetchRequests()
    },[])

    return (
        <div className="request-page-panel">
            <div className="panel-header">
                <p className="panel-heading">Pending Requests</p>
            </div>
            {pendingRequests.length === 0 ? 
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <img style={{height:'30px',marginRight:'10px'}} src={notfoundicon} alt="" />
                <p style={{color:'#666666'}}> No Pending Requests Found !</p>
            </div>
            :
             ""}
            {pendingRequests.map(request => {
                if(currentUser.usertype === ADMIN){
                    return <Request refresh={fetchRequests} request={request}/>
                }
                if(request.clientid === currentUser.id){
                    return <Request refresh={fetchRequests} request={request}/>
                }

                return null
            })}
            <div style={{margin:'20px 0 '}} className="panel-header">
                <p className="panel-heading" >History</p>
            </div>
            {history.length === 0 ?
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <img style={{height:'30px',marginRight:'10px'}} src={notfoundicon} alt="" />
                <p style={{color:'#666666'}}> No History yet !</p>
            </div>
            :
             ""}
            {history.map(request => {
                if(currentUser.usertype === ADMIN){
                    return <Request t={true} refresh={fetchRequests} request={request}/>
                }
                if(request.clientid === currentUser.id){
                    return <Request t={true} refresh={fetchRequests} request={request}/>
                }

                return null
            })}
        </div>
    )
}