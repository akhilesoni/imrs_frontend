import "../../style/componentStyle/invoice.css"
import userIcon from "../../icons/user.svg"
import rupeesIcon from "../../icons/rupees.svg"
import attachmentIcon from "../../icons/attachment.svg"
import maximizeIcon from "../../icons/maximize.svg"
import Dropdown from "react-bootstrap/Dropdown"
import { PAID, UNPAID } from "../../utilities/Constants"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Invoice(props){
    const invoice = props.invoice
    
    const getStatus = () => {
        if(invoice.paymentstatus === UNPAID){
            if(invoice.approved){
                return "pending"
            }else{
                return "draft"
            }
        }
        if(invoice.paymentstatus === PAID){
            return "paid"
        }
        else{
            return "partial"
        }
    }

 
    const getStatusColor = () => {
        if(invoice.paymentstatus === UNPAID){
            if(invoice.approved){
                return "red"
            }else{
                return "blue"
            }
        }else if(invoice.paymentstatus === PAID){
            return "green"
        }else{
            return "green"
        }
    }
    const getAmount = () => {
        const balance = parseInt(invoice.amount) - parseInt(invoice.paidamount)
        return balance
    }
    console.log(invoice)
    return (
        <div>
            <div className="invoice">
                <p className="invoice-heading">{invoice.invoiceid}</p>
                <p className="invoice-below-heading">Id {invoice.id}</p>
                <div className="invoice-date-wrapper">
                    <p>{invoice.date}</p>
                    <div className="date-line"></div>
                    <p>{invoice.duedate}</p>
                </div>
                <div className="invoice-text-wrapper">
                    <img src={rupeesIcon} alt="" className="invoice-icon"/>
                    <p className="invoice-text">Rs. {getAmount()}.00 </p>
                </div>
                <div className="invoice-text-wrapper">
                    <img src={userIcon} alt="" className="invoice-icon"/>
                    <p className="invoice-text">{invoice.clientname}</p>
                </div>
                <div className="invoice-text-wrapper">
                    <div className="invoice-status" style={{backgroundColor:getStatusColor()}}>
                        <p>{getStatus()}</p>
                    </div>
                </div>
                <Link to={`${invoice.id}`}>
                    <div className="invoice-blue-button">
                        <img src={maximizeIcon} alt="" className="invoice-icon"/>
                        <p>Open</p>
                    </div>
                </Link>
            </div>
           
        </div>
    )
}