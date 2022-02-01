
import "../../style/dashboardStyle/panel.css"
import "../../style/componentStyle/form.css"
import { useEffect, useState } from "react"
import "../../style/dashboardStyle/add_invoice.css"
import { useDispatch, useSelector } from "react-redux"
import { CHEQUE, CLIENT, PAID, PARTIAL, RTGS, TOKEN, UNPAID, UPI, URL, USER } from "../../utilities/Constants"
import { useNavigate } from "react-router-dom"
import { setUsers } from "../../redux/actions/userActions"
import "../../style/dashboardStyle/table.css"
import { useAlert } from "react-alert"
import { setLoading } from "../../redux/actions/loadingActions"



export default function AddInvoice(){
    const currentUser = localStorage.getItem(USER)
    const users = useSelector(state => state.users)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const alert = useAlert()
    const [imagePreviewSource, setImagePreviewSource] = useState()
    const [activity,setActivity] = useState(false)
    const [state, setState] = useState({
        invoiceId:'',
        clientId:'',
        amount:0,
        paidAmount:0,
        date:'',
        dueDate:'',
        approved:false,
        paymentStatus: UNPAID,
        imageUrl:'',
        clientName:'',
        paymentId:'',
        paymentMethod:UPI
    })
  

    useEffect(() => {
        dispatch(setLoading(true))
        fetch(URL + 'users',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(!data.isValid){
                navigate('/')
            }
            dispatch(setUsers(data.users))
            dispatch(setLoading(false))

        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLoading(true))

        if(state.invoiceId === '' || state.amount === 0 || state.clientName === '' || state.clientId === '' || state.date == '' || state.dueDate === '' || state.paymentStatus === '' /*&& state.imageUrl !== ''*/){
            alert.show('Please Fill Importent Details!')
            dispatch(setLoading(false))

            return
        }
        if(state.paymentStatus === PAID || state.paymentStatus === PARTIAL){
            if(state.paidAmount === 0 && state.paymentId === ''){
                alert.show('Fill Complete Payment Details')
                dispatch(setLoading(false))

                return
            }
        }
        if(!imagePreviewSource){
            alert.show('Image Not Selected');
            dispatch(setLoading(false))

            return 
        }
        fetch(URL + 'addInvoice' , {
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN),
                invoice:state,
                image:imagePreviewSource
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                alert.show('Invoice Uploaded Successfully')
                setState({
                    invoiceId:'',
                    clientId:'',
                    amount:0,
                    paidAmount:0,
                    date:'',
                    dueDate:'',
                    approved:false,
                    paymentStatus: UNPAID,
                    imageUrl:'',
                    clientName:'',
                    paymentId:'',
                    paymentMethod:UPI
                })
                setImagePreviewSource()
            }else{
                alert.show('Something Went Wrong!')
                setTimeout(()=>{
                    navigate('/')
                },100)
            }
            dispatch(setLoading(false))

        })

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePreviewSource(reader.result)
        }
    }

    const OnActivityResult = (user) =>{
        setState({...state,clientName:user.name,clientId:user.id})
        toggleActivity()
    }

    const toggleActivity = () => {
        setActivity(!activity)
    }
    return (
        <div className="add-invoice-panel">
            <div className="panel-header">
                <p className="panel-heading">
                    Add Invoice
                </p>
            </div>
            <div className="invoice-form">
                <form onSubmit={handleSubmit} className="wide-form">
                    <div className="form-half">
                        <p className="form-heading-medium">
                            Invoice Reference Number
                        </p>
                        <input type="text"
                            required
                            placeholder="Enter Invoice Reference Number"
                            name="invoiceId"
                            value={state.invoiceId}
                            onChange={(e)=> setState({...state,invoiceId:e.target.value})}
                             />
                        <p className="form-heading-big">Payment Details</p>
                        <div className="col-wrapper">
                            <div className="col-half">
                                <p className="form-heading-medium">
                                    Amount
                                </p>
                                <input type="number"
                                    required
                                    onChange={(e)=> setState({...state,amount:e.target.value})}
                                    placeholder="Amount" />
                                <p className="form-heading-medium">
                                    Paid Amount
                                </p>
                                <input type="number"
                                    required
                                    onChange={(e)=> setState({...state,paidAmount:e.target.value})}
                                    placeholder="Paid Amount" />
                            
                            </div>
                            <div className="col-half">
                                <p className="form-heading-medium">
                                    Payment Status
                                </p>
                                <select name="paymentStatus" 
                                        required
                                        onChange={(e) => setState({...state,paymentStatus:e.target.value})}>
                                        <option value={UNPAID}>Unpaid</option>                                        
                                        <option value={PAID}>Paid</option>
                                        <option value={PARTIAL}>Partially Paid</option>
                                    </select>
                                <p className="form-heading-medium">
                                    Payment Method ( If Paid )
                                </p>
                                <select name="paymentMethod" 
                                        required
                                        onChange={(e) => setState({...state,paymentMethod:e.target.value})}>
                                        <option value={UPI}>UPI</option>
                                        <option value={RTGS}>RTGS</option>
                                        <option value={CHEQUE}>Bank Cheque</option>
                                    </select>
                            </div>
                        </div>
                        <p className="form-heading-medium">
                                    Payment Reference Number
                                </p>
                                <input type="text"
                                    required
                                    onChange={(e)=> setState({...state,paymentId:e.target.value})}
                                    placeholder="Reference number" />
                    </div>
                    <div className="form-half">
                        <div className="col-wrapper">
                            <div className="col-half">
                                <p className="form-heading-medium">
                                    Date
                                </p>
                                <input type="date"
                                    required
                                    value={state.date}
                                    onChange={(e)=>setState({...state,date:e.target.value})}
                                    placeholder="Date" />
                            </div>
                            <div className="col-half">
                                <p className="form-heading-medium">
                                    Due Date
                                </p>
                                <input type="date"
                                    required
                                    value={state.dueDate}
                                    onChange={(e)=>setState({...state,dueDate:e.target.value})}
                                    placeholder="Due Date" />
                            </div>
                        </div>
                        <p className="form-heading-big">Client Details</p>
                        <div className="col-wrapper">
                            <div className="col-half">
                                <p className="form-heading-medium">Choose Customer</p>
                                <p onClick={toggleActivity} className="activity-open">Select Customer</p>
                            </div>
                            <div className="col-half">
                                <p className="form-heading-medium">Customer</p>
                                <p className="activity-open">{state.clientId} - {state.clientName}</p>
                            </div>
                        </div>
                        <p className="form-heading-big">Invoice Snapshot</p>
                        <input type="file" 
                            value={state.imageUrl} 
                            name="imageUrl" 
                            onChange={handleImageChange}
                             />
                        {
                            imagePreviewSource && (
                                <img src={imagePreviewSource} style={{width:'100%',borderRadius:'10px',marginTop:'10px',boxShadow:'0 0 5px rgba(0,0,0,0.2)'}}/>
                            )
                        }
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
            <div onClick={toggleActivity} className={activity ? "cover" : ""}></div>

            <div className={activity ? "activity-panel":"invisible"}>
                <p>Select Customer</p>
                <div className="activity-table">
                   <div className="table-wrapper">
                    <table className="users-table">
                            <tr className="table-head">
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                            </tr>
                            {users.users.map((user) => {
                                if(user.usertype === CLIENT){
                                    return(
                                        <tr onClick={() => OnActivityResult(user)}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.company}</td>
                                        </tr>
                                    )
                                }
                               })}
                        </table>
                   </div>
                </div>
            </div>
        </div>
    )
}