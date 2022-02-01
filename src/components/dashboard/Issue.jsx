import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import "../../style/componentStyle/issue.css"

import deleteicon from "../../icons/delete.svg"
import checkicon from "../../icons/check.svg"
import maximizeicon from "../../icons/maximize.svg"
import pendingicon from "../../icons/pending.svg"

import { ADMIN, TOKEN, URL, USER } from "../../utilities/Constants"
import { useDispatch } from "react-redux"
import { setLoading } from "../../redux/actions/loadingActions"
export default function Issue(props){
    const dispatch = useDispatch()
    const issue = props.issue
    const currentUser = JSON.parse(localStorage.getItem(USER));
    const navigate = useNavigate()
    const alert = useAlert()
    const handleInvoiceClick = () => {
        navigate('/home/invoices/'+issue.invoiceid)
    }

    const handleDeleteClick = () => {
        alert.show('Do you want to do this?',{
            title:'Delete Issue',
            closeCopy:'Cancel',
            actions:[
                {
                    copy:"Delete",
                    onClick:()=> {
                       deleteIssue()
                    }
                }
            ]
        })
    }

    const deleteIssue = () => {
        dispatch(setLoading(true))
        fetch(URL + 'issue/'+issue.id,{
            method:'delete',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res=> res.json()).then(data => {
            if(data.isValid){
                alert.show('Issue Deleted Successfully!')
                props.refreshPage()
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })
    }
    const resolveIssue = () => {
        dispatch(setLoading(true))
        fetch(URL + 'resolve_issue',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                id:issue.id
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                alert.show('Issue Resolved!')
                props.refreshPage()
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))
        })
    }

    const handleResolveClick = () => {
        alert.show('Do you want to do this?',{
            title:'Resolve Issue',
            closeCopy:'Cancel',
            actions:[
                {
                    copy:"Resolve",
                    onClick:()=> {
                       resolveIssue()
                    }
                }
            ]
        })
    }
    return (
        <div className="issue">
            <div>
                <div style={{margin:'0',flexWrap:'wrap'}} className="wrapper">
                    {issue.resolved ? <img style={{height:'18px'}} src={checkicon}/>:<img style={{height:'18px'}} src={pendingicon}/>}
                    <p className="issue-b">{issue.message}</p>
                    <p className="issue-m">{issue.date.substring(0,8) + " at " + issue.date.substring(8,issue.date.length)}</p> 
                </div>
                
            </div>
            <div className="action-wrapper">
               
                {
                    currentUser.usertype === ADMIN?
                    <div onClick={handleInvoiceClick} className="action-button-g">
                        <img className="action-button-icon-b" src={maximizeicon} alt="" />
                        <p style={{color:'var(--blue)'}} className="action-button-text">Invoice</p>
                    </div>
                    :
                    (
                     
                        <div style={{display:'flex',flexWrap:'wrap'}}>
                            <div onClick={handleInvoiceClick} className="action-button-b" style={{margin:'10px 10px 10px 0 '}}>
                                <img className="action-button-icon" src={maximizeicon} alt="" />
                                <p className="action-button-text">Invoice</p>
                            </div>
                            {
                                issue.resolved?
                                ''
                                :
                                <div onClick={handleResolveClick} className="action-button-g">
                                    <img className="action-button-icon" src={checkicon} alt="" />
                                </div>
                            }
                            <div onClick={handleDeleteClick} className="action-button-r">
                                <img className="action-button-icon" src={deleteicon} alt="" />
                            </div>
                        </div>
                       
                    )

                }
            </div>
        </div>
    )
}