import { useState } from "react"
import "../../style/componentStyle/form.css"
import { useAlert } from "react-alert";
import { TOKEN, URL } from "../../utilities/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
export default function AddUser(){
    const [state, setState] = useState({
        name:'',
        email:'',
        phone:'',
        usertype:'admin',
        password:'',
        address:'',
        company:''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert();

    const createUser = (user) =>{
        fetch(URL + 'addUser',{
            method:'post',
            body:JSON.stringify({
                user:state,
                token:localStorage.getItem(TOKEN)
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(data.isValid){
                dispatch(addUser(user))
                alert.show('User added successfully!',{
                    title:'Success'
                })
            }
            else{
                navigate('/')
            }
        })
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        if(state.name!=='' && state.email !== '' && state.phone !== '' && state.usertype !== '' && state.password !== '' && state.address !== '' && state.company !== '' ){
            let message = 'do you want to add ' + state.name + ' as '+state.usertype+'?'
            let title = 'Add Customer'
            alert.show(message,{
                title:title,
                closeCopy:'No',
                actions:[
                    {
                        copy:"Yes",
                        onClick:()=> {
                            createUser(state)
                            setState({
                                name:'',
                                email:'',
                                phone:'',
                                usertype:'Admin',
                                password:'',
                                address:'',
                                company:''
                            })
                        }
                    }
                ]
            })
        }
    }   
    return (
        <div className="add-user-panel">
            <div className="panel-header">
                <p className="panel-heading">
                    Add User
                </p>
            </div>

            <div className="user-info-form">
               <form className="wide-form" onSubmit={handleSubmit}>
                    <div className="form-half">
                            <p className="form-heading-medium">Basic Information</p>
                            <input type="text"
                                name="name"
                                maxLength={30}
                                value={state.name}
                                required
                                placeholder="Enter Full Name"
                                onChange={(e)=> setState({...state,name:e.target.value})} />
                            <p className="form-heading-medium">Contact and Company</p>
                            <div className="col-wrapper">
                                <div className="col-half">
                                    <input type="text"
                                        name="email"
                                        maxLength={30}
                                        value={state.email}
                                        required
                                        placeholder="Email"
                                        onChange={(e)=> setState({...state,email:e.target.value})} />
                                    <input type="text"
                                        name="phone"
                                        maxLength={12}
                                        required
                                        value={state.phone}
                                        placeholder="Phone"
                                        onChange={(e)=> setState({...state,phone:e.target.value})} />
                                </div>
                                <div className="col-half">
                                    <input type="text"
                                        name="company"
                                        required
                                        maxLength={50}
                                        value={state.company}
                                        placeholder="Company"
                                        onChange={(e)=> setState({...state,company:e.target.value})} />
                                    <select name="usertype" 
                                        required
                                        onChange={(e) => setState({...state,usertype:e.target.value})}>
                                        <option value="admin">Admin</option>
                                        <option value="client">Customer</option>
                                    </select>
                                </div>
                            </div>
                            <p className="form-heading-medium">Password</p>
                            <input type="password"
                                name="password"
                                maxLength={9}
                                required
                                value={state.password}
                                placeholder="Password"
                                onChange={(e)=> setState({...state,password:e.target.value})} />
                        
                    </div>
                    <div className="form-half">
                        <p className="form-heading-medium">Address</p>
                        <input type="text"
                            required
                            name="address"
                            maxLength={100}
                            value={state.address}
                            placeholder="Enter Valid Address"
                            onChange={(e)=> setState({...state,address:e.target.value})} />
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
               </form>
            </div>
            
        </div>
    )
}