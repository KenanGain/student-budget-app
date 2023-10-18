import { Form } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

import illustration from "../assets/illustration.jpeg"



const Login = ({ onGoBack }) => {

    
const [ user, setUser ] = useState({
    userName:"",
    password:""
})

const handleChange = e => {
    
    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
    })
    // console.log(e.target);
}



return (
    <div className="intro">
           
    <div>
        <h1>
            Take Control of <span className="accent">
                Your Money
            </span>
        </h1>
        <p>
        Budgeting your money is the key to having enough
        </p>
        <Form method="post">
        {console.log("User", user)}
        <label htmlFor="userName">Username</label>
            <input 
            type="text" name="userName" required
            placeholder="What is your name?"
            aria-label="Your Name" 
            value={user.userName}
            onChange={ handleChange }
            />
             <label htmlFor="password">Password</label>
             <input 
             type="password" name="password" required
            placeholder="Password"
            aria-label="Your Name" 
            value={user.password}
            onChange={ handleChange }
            />

                <input type="hidden" name="_action" value="login" />

            <button type="submit" className="btn btn--dark" onClick={login}>
                        <span>Login</span>
                        
                    </button>
                    <button type="button" className="btn btn--secondary" onClick={onGoBack}>
                        Go Back
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Person with money" width={600} className="mainimg" />
        </div> 

) 
}

export default Login