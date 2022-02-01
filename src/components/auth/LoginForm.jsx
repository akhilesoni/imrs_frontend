import '../../style/loginStyle/login_page.css';
import { useState } from 'react';
import { EMAIL, PASSWORD, TOKEN, URL, USER } from '../../utilities/Constants';
import Notice from '../utilities/Notice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/actions/loadingActions';

export default function LoginForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notice, setNotice] = useState({
        message:'',
        visibility:false
    });
    const [user, setUser] =  useState({
        email:"",
        password:""
    });

    const closeNotice = () => {
        setTimeout(()=>{
            setNotice({
                message:'',
                visibility:false
            })
        },2000);
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(setLoading(true))
        if(user.email === "" || user.password === ""){
            dispatch(setLoading(false))
            return;
        }
        fetch(URL+'login',{
            method:'POST',
            body:JSON.stringify({
                user:user
            }),
            headers:{
                'Content-type':'application/json'
            }
        }).then(res => res.json()).then(data => {
            if(!data.isFound){
                setNotice({
                    message:'user not exists!',
                    visibility:true
                });
                closeNotice();
                
            }
            if(data.isFound && !data.isCorrect){
                
                setNotice({
                    message:'Password Incorrect!',
                    visibility:true
                })
                closeNotice();
                
            }
            if(data.isCorrect && data.isFound){
                localStorage.setItem(TOKEN,data.token);
                console.log(data.user)
                localStorage.setItem(USER,JSON.stringify(data.user));
                navigate('/home')
                
            }
            dispatch(setLoading(false))

        })
        

    }

    const handleChange = (e) => {
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        switch(name){
            case EMAIL:
                setUser({...user,"email":value});
                break;
            case PASSWORD:
                setUser({...user,"password":value});
                break;
        }
    }
    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit} className='login-form'>
                <p className='heading'>IMRS</p>
                <label>
                    E-mail
                </label>
                <input type="text" 
                    onChange={handleChange}
                    name='email' 
                    required
                    placeholder='E-mail' 
                    value={user.email}/>
                <label>
                    Password
                </label>
                <input type="password" 
                    onChange={handleChange}
                    name='password' 
                    placeholder='******' 
                    required
                    value={user.password}/>
                <button onSubmit={handleSubmit} type="submit" name='submit'>Sign in</button>
            </form>
            <Notice notice={notice}/>
            <p className='forget-notice'>Forget Password? Contact Admin</p>
        </div>
    )
}