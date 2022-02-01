import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/dashboard/AddButton"
import Invoice from "../../components/dashboard/Invoice";
import Add from "../../icons/add.svg"
import { setInvoices } from "../../redux/actions/invoiceActions";
import { setLoading } from "../../redux/actions/loadingActions";
import { ADMIN, TOKEN, URL, USER } from "../../utilities/Constants";

export default function Invoices(){
    const currentUser = JSON.parse(localStorage.getItem(USER))
    const dispatch = useDispatch();
    const invoices = useSelector(state => state.invoices)
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(setLoading(true))

        fetch(URL + 'invoices',{
            method:'post',
            body:JSON.stringify({
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data=> {
            if(data.isValid){
                console.log(data.invoices)
                var filteredInvoices = null
                if(currentUser.usertype === ADMIN){
                    filteredInvoices = data.invoices
                }else{
                    filteredInvoices = data.invoices.filter((invoice) => {
                        return invoice.clientid === currentUser.id
                    })
                }
                dispatch(setInvoices(filteredInvoices))
            }else{
                navigate('/')
            }
            dispatch(setLoading(false))

        })
    },[])

    return (
        <div className="invoice-panel">
            <div className="panel-header">
                <p className="panel-heading">Invoices</p>
                {currentUser.usertype === ADMIN ? 
                 <AddButton link={'add_invoice'} title={'Create Invoice'}/> 
                 : null
                 }
            </div>
            <div className="invoice-list">
                {invoices.invoices.map(invoice => (
                    <Invoice invoice={invoice}/>
                ))}
            </div>
        </div>
    )
}