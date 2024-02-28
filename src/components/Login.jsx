import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate()
    const handleLogin = ()=>{
        axios.post("http://localhost:3000/admin/login",{},{
            headers:{
                username:email,
                password
            }
        }).then(response=>{
            console.log(response.data)
            if (response.data.error){
                console.log(response.data.error)
            }else{
                if(response.data.token){
                    localStorage.setItem("auth","Bearer "+response.data.token)
                    navigate('/courses')
                }
            }
        });
        setEmail("")
        setPassword("")

    }

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        Email - <input type={"text"}  value={email} onChange={e => setEmail(e.target.value)}/>
        <br/>
        Password - <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
        <br/>
        <button onClick={handleLogin}>Login</button>
        <br/>
        New here? <button onClick={()=>navigate('/register')}>Register</button>
    </div>
}

export default Login;