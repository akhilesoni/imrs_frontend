import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Issue from "../components/dashboard/Issue"
import { ADMIN, TOKEN, URL, USER } from "../utilities/Constants"
import ClipLoader from "react-spinners/ClipLoader";
import issueicon from "../icons/issueMessage.svg"
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/actions/loadingActions"
import notfoundicon from "../icons/notfound.svg"

export default function IssuePage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem(USER))
    const [issues,setIssues] = useState([])
    const [resolvedIssues,setResolvedIssues] = useState([])

    useEffect(()=>{
        fetchIssues()
    },[])
    const fetchIssues = () => {
        dispatch(setLoading(true))
        var filter = null
        if(currentUser.usertype === ADMIN){
            filter = ADMIN
        }else{
            filter = currentUser.id
        }
        
        fetch(URL + 'issues',{
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
                setIssues(data.issues.filter((issue) => (!issue.resolved)))
                setResolvedIssues(data.issues.filter((issue) => (issue.resolved)))

            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })
    }
    return (
        <div className="issue-panel">
            <div className="panel-header" style={{margin:'0 0 20px 0'}}>
                <p className="panel-heading">Issues</p>
            </div>

            {issues.length === 0 ? 
             <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <img style={{height:'30px',marginRight:'10px'}} src={notfoundicon} alt="" />
                <p style={{color:'#666666'}}> No Issue Found !</p>
            </div>
            : ""}
            {issues.map(issue => (
                <Issue refreshPage={fetchIssues} issue={issue}/>
            ))}
            <div className="panel-header" style={{margin:'20px 0 15px 0'}}>
                <p className="panel-heading">Resolved Issues</p>
            </div>
            {resolvedIssues.length === 0 ? 
             <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>
                <img style={{height:'30px',marginRight:'10px'}} src={notfoundicon} alt="" />
                <p style={{color:'#666666'}}> No Issue Resolved Yet!</p>
            </div>
            : ""}
            {resolvedIssues.map(issue => (
                <Issue refreshPage={fetchIssues} issue={issue}/>
            ))}
        </div>
    )
}