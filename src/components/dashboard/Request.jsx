import { useAlert } from "react-alert"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLoading } from "../../redux/actions/loadingActions"
import "../../style/componentStyle/request.css"
import { ADMIN, TOKEN, URL, USER } from "../../utilities/Constants"
import maximizeicon from "../../icons/maximize.svg"
import deleteicon from "../../icons/delete.svg"
import checkicon from "../../icons/check.svg"
import pendingicon from "../../icons/pending.svg" 
export default function Request(props){
    const { request }  = props
    const { refresh } = props
    const dispatch = useDispatch()
    const currentUser = JSON.parse(localStorage.getItem(USER))
    const navigate = useNavigate();
    const alert = useAlert();

    const handleInvoiceClick = () => {
        navigate('/home/invoices/'+request.invoiceid)
    }

    const handleUnsend = () => {
        alert.show('Do you want to do this?',{
            title:'Unsend Request',
            closeCopy:'Cancel',
            actions:[
                {
                    copy:"Unsend",
                    onClick:()=> {
                       deleteRequest()
                    }
                }
            ]
        })
    }

    const handleAccept = () => {
        alert.show('Do you want to do this?',{
            title:'Accept Request',
            closeCopy:'Cancel',
            actions:[
                {
                    copy:"Accept",
                    onClick:()=> {
                       acceptRequest()
                    }
                }
            ]
        })
    }
    const acceptRequest = () => {
        dispatch(setLoading(true))
        fetch(URL + 'accept_request',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                request:request
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                alert.show('Reconciliation Done Successfully!',{
                    title:'Successful'
                })
                refresh()
            }else{
                navigate('/')
            }
            

        })
    }

    const deleteRequest = () => {
        dispatch(setLoading(true))

        fetch(URL + 'request',{
            method:'delete',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                id:request.id
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                refresh()
                alert.show('Request Deleted Successfully!')
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })
    }
    return (
        <div className="request">
            <div style={{alignItems:"center",display:'flex',flexWrap:'wrap'}}>
                <div style={{margin:'5px 0'}} className="wrapper">
                    {
                        (request.accepted?<img style={{height:'18px',margin:'0 5px 0 0'}} src={checkicon}/>:<img style={{height:'18px',margin:'0 5px 0 0'}} src={pendingicon}/>)
                    }
                    <p className="req-b">
                    &#x20B9; {request.amount}
                    </p>
                    <p className="req-status">By {request.paymentmethod}</p>
                    
                </div>
                <div className="request-d-wrapper" style={{flexWrap:'wrap',alignItems:'center',margin:'0'}}>
                    <p className="req-m" > Ref. no. - {request.paymentid} </p>
                    <p className="req-m"  style={{backgroundColor:'gray',color:'white',padding:'2px 5px',borderRadius:'5px',fontSize:'13px'}}>  {request.date.substring(0,8)} at {request.date.substring(8)}</p>
                </div>
            </div>
            <div style={{display:'flex'}}>
                    <div onClick={handleInvoiceClick} className="action-button-g" style={{margin:'10px 10px 10px 0'}}>
                        <img className="action-button-icon-b" src={maximizeicon} alt="" />
                        <p style={{color:'var(--blue)'}} className="action-button-text">Invoice</p>
                    </div>
                {   props.t?
                    ''
                    :
                    (currentUser.usertype === ADMIN ?
                        <div onClick={handleAccept} className="action-button-g">
                            <img className="action-button-icon" src={checkicon} alt="" />
                            <p className="action-button-text">Accept</p>
                        </div>
                    :
                    <div onClick={handleUnsend} className="action-button-r">
                        <img className="action-button-icon" src={deleteicon} alt="" />
                        <p className="action-button-text">Delete</p>

                    </div>)
                }

            </div>
        </div>
    )
}