import { useState } from "react"
import { useEffect } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import "../style/dashboardStyle/invoice_page.css"
import { ADMIN, CHEQUE, PAID, RTGS, TOKEN, UPI, URL, USER } from "../utilities/Constants"
import ClipLoader from "react-spinners/ClipLoader";
import { setLoading } from "../redux/actions/loadingActions"
import User from "../components/dashboard/User"
import deleteicon from "../icons/delete.svg"

export default function InvoicePage(){
    const {id} = useParams()
    const dispatch = useDispatch()


    const navigate = useNavigate()
    const alert = useAlert()
    const currentUser = JSON.parse(localStorage.getItem(USER))

    const [issue, setIssue] = useState({
        message:'',
        invoiceid:id,
        clientid:currentUser.id
    })
    const [reconciliation, setReconciliation] = useState({
        paymentid:'',
        paymentmethod:UPI,
        clientid:currentUser.id,
        invoiceid:id,
        amount:null
    })
    const [invoice, setInvoice] = useState({
        id:id,
        invoiceid:'',
        date:'',
        duedate:'',
        amount:'',
        paidamount:'',
        paid:false,
        approved:false,
        clientid:'',
    })

    const [issuePrompt, setIssuePrompt] = useState(false)
    const [reconciliationPrompt, setReconciliationPrompt] = useState(false)
    

    const [user, setUser] = useState({
        id:'',
        name:'',
        email:'',
        phone:'',
        address:'',
        company:''
    })

    const handleApprove = () => {
        dispatch(setLoading(true))

        fetch(URL + 'approve',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                id:id
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                alert.show('Invoice Approved Successfully!')
                fetchData();
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })

    }

    const fetchData = () => {

        fetch(URL + 'invoice/'+id,{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                setInvoice(data.invoice)
                setUser(data.user)
            }else{
                navigate('/home')
            }
            dispatch(setLoading(false))
        })
    }

    useEffect(()=> {
        dispatch(setLoading(true))
        fetchData();
    },[])

    const toggleIssuePrompt = () =>{
        setIssuePrompt(!issuePrompt)
    }
    const toggleReconciliationPrompt = () =>{
        setReconciliationPrompt(!reconciliationPrompt)
    }

    const handleRaiseIssue = () => {
        dispatch(setLoading(true))

        fetch(URL + 'raiseissue',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                issue:issue
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                alert.show('Issue Raised!')
                toggleIssuePrompt()
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })
    }
    const handleReconciliationRequest = () => {
        dispatch(setLoading(true))

        if(reconciliation.amount === 0 || reconciliation.paymentid === ""){
            alert.show('Please Fill Complete Details!')
            return 
        }
        else{
            fetch(URL + 'requestreconciliation',{
                method:'post',
                body:JSON.stringify({
                    token:localStorage.getItem(TOKEN),
                    reconciliation:reconciliation
                }),
                headers:{
                    'Content-type':'application/json'
                }
            }).then(res => res.json()).then(data => {
                if(data.isValid){
                    alert.show('Request Sent Successfully!')
                    toggleReconciliationPrompt()
                    
                }else{
                    navigate('/')
                }
                dispatch(setLoading(false))

            })
        }
    }

    const handleDelete = () => {
        fetch(URL + 'invoice/'+invoice.id,{
            method:'delete',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                alert.show('Deleted Successfully!',{
                title:'Deleted'
                })
                navigate('/home')
            }else{
                navigate('/')
            }
        })
    }
    return (
        <div className="invoice-page-panel">
            <div className="invoice-header">
                <div className="invoice-logo">
                    IMRS
                </div>
                <div className="invoice-heading-wrapper">
                    <p className="big-text">INVOICE</p>
                    <p className="small-g-text">{invoice.invoiceid}</p>
                </div>
            </div>
            <div className="line"></div>
            <div className="invoice-section">
                <p className="medium-text">
                    Client Details
                </p>
                <User type={"H"} user={user}/>
            </div>
            <div className="line"></div>
            <div className="invoice-section">
                <p className="medium-text">
                    Payment Details
                </p>
                <div className="table-wrapper">
                    <table className="users-table">
                        <tr className="table-head">
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Payment Reference</th>
                        </tr>
                        <tr>
                            <td>{invoice.amount}</td>
                            <td>{invoice.paidamount}</td>
                            <td>{invoice.paidamount === 0 ? "NA" : invoice.paymentmethod}</td>
                            <td>{invoice.paymentstatus}</td>
                            <td>{invoice.paymentid === "" ? "NA" : invoice.paymentid}</td>


                        </tr>
                    </table>
                </div>
            </div>
            <div className="line"></div>
            <div className="invoice-section">
                <p className="medium-text">
                    Other Details
                </p>
               <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px',margin:'20px 0'}}>
                    <p><span style={{color:'grey'}}>Approved By Client </span> {invoice.approved ? "YES" : "NO"}</p>
                    <p><span style={{color:'grey'}}>Created </span> {invoice.date}</p>
                    <p><span style={{color:'grey'}}>Due Date </span> {invoice.duedate}</p>
               </div>
            </div>
            <div className="line"></div>
            <div className="invoice-section">
                <p className="medium-text">
                    Invoice Snapshot
                </p>
                <img style={{width:'100%',borderRadius:'10px',margin:'20px 0'}} src={invoice.imageurl} alt="" />
            </div>
            <div className="line"></div>
            <div className="invoice-section">
                <p className="medium-text">
                    Invoice Actions
                </p>
                {
                currentUser.usertype === ADMIN ?
                <div>
                    <div className="invoice-action-wrapper">
                        <p className="invoice-text">Add Payment</p>
                        <div className="action-button-g">
                            <p>Pay</p>
                        </div>
                    </div>
                    <div className="invoice-action-wrapper">
                        <p className="invoice-text">Delete This Invoice </p>
                        <div onClick={handleDelete} className="action-button-r">
                            <img src={deleteicon} alt="" className="action-button-icon"/>
                            <p className="action-button-text">Delete</p>
                        </div>
                    </div>
                </div>:
                <div>
                    <div className="invoice-action-wrapper">
                        <p className="invoice-text">Approve Invoice</p>
                        
                        <p onClick={handleApprove} className={invoice.approved ? '':"invoice-button-green"}>{invoice.approved ? 'APPROVED':'Approve'}</p>
                    </div>
                    <div className="invoice-action-wrapper">
                        <p className="invoice-text">Request Reconciliation</p>
                        <p onClick={toggleReconciliationPrompt} className={invoice.paymentstatus === PAID ? "" : "invoice-button-green"}>{invoice.paymentstatus === PAID ? "PAID" : "Request"}</p>
                    </div>
                    <div className="invoice-action-wrapper">
                        <p className="invoice-text">Raise Issue</p>
                        <p onClick={toggleIssuePrompt} className="invoice-button-red">Issue</p>
                    </div> 
                </div>
                }
            </div>
            <div onClick={()=>setIssuePrompt(!issuePrompt)} className={issuePrompt?"cover":""}></div>
            <div className={issuePrompt?"issue-prompt":"invisible"}>
                <p>Enter Issue</p>
                <textarea onChange={(e)=>setIssue({...issue,message:e.target.value})} name="message" id="" cols="30" rows="5" value={issue.message}></textarea>
                <button onClick={handleRaiseIssue}>Raise </button>
            </div>
            <div onClick={toggleReconciliationPrompt} className={reconciliationPrompt?"cover":""}></div>
            <div className={reconciliationPrompt?"reconciliation-prompt":"invisible"}>
                <p style={{marginBottom:"20px"}}>Enter Payment Details</p>
                <div className="wide-form">       
                    <div className="col-wrapper">
                        <div className="col-half">
                            <input type="number" 
                            name="amount"
                            value={reconciliation.amount}
                            placeholder="Amount"
                            onChange={(e)=>setReconciliation({...reconciliation,amount:e.target.value})} />
                        </div>
                        <div className="col-half">
                            <select name="paymentMethod" 
                                required
                                onChange={(e) => setReconciliation({...reconciliation,paymentmethod:e.target.value})}>
                                <option value={UPI}>UPI</option>
                                <option value={RTGS}>RTGS</option>
                                <option value={CHEQUE}>Bank Cheque</option>
                            </select>
                        </div>
                    </div>
                    <input type="text" 
                    name="paymentid"
                    placeholder="Payment Reference"
                    value={reconciliation.paymentid}
                    onChange={(e)=>setReconciliation({...reconciliation,paymentid:e.target.value})} />

                    <button onClick={handleReconciliationRequest}>Make Request </button>
                
                </div>
            </div>
        </div>
    )
}