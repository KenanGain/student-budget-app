import { Form, Link } from "react-router-dom";
import React, { useState } from "react";
import { UserIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import illustration from "../assets/illustration.jpeg"

const Intro = ({ onAlreadyHaveAccount }) => {

const [ user, setUser ] = useState({
    userName:"",
    password:"",
    reEnterPassword:""
    // maincurrency:"",
    // secondarycurrency:""
    
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
                {/* {console.log("User", user)} */}
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
                    <label htmlFor="reEnterPassword">Re-Password</label>
                    <input 
                    type="password" name="reEnterPassword" required
                   placeholder="Password"
                   aria-label="Your Name" 
                   value={user.reEnterPassword}
                   onChange={ handleChange }
                   />


                    <label htmlFor="maincurrency">Select Primary Currency:</label>

                    <select id="maincurrency" name="maincurrency" required value={user.maincurrency}  onChange={ handleChange }>
                    <option value="">Select a primary currency</option>

                    <option value="CAD">CAD</option>
<option value="USD">USD</option>
<option value="EUR">EUR</option>
<option value="JPY">JPY</option>
<option value="GBP">GBP</option>
<option value="AUD">AUD</option>
<option value="CHF">CHF</option>
<option value="CNY">CNY</option>
<option value="INR">INR</option>
<option value="BRL">BRL</option>
<option value="ZAR">ZAR</option>
<option value="NZD">NZD</option>
<option value="MXN">MXN</option>
<option value="SGD">SGD</option>
<option value="HKD">HKD</option>
<option value="NOK">NOK</option>
<option value="SEK">SEK</option>
<option value="RUB">RUB</option>

                    </select>

                    <label htmlFor="secondarycurrency">Select Secondary Currency:</label>
                    <select id="secondarycurrency" name="secondarycurrency" required value={user.secondarycurrency}  onChange={ handleChange }>
                    <option value="">Select a secondary currency</option>

                    <option value="INR">INR</option>
                    <option value="CAD">CAD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="GBP">GBP</option>
<option value="AUD">AUD</option>
<option value="CHF">CHF</option>
<option value="CNY">CNY</option>
<option value="BRL">BRL</option>
<option value="ZAR">ZAR</option>
<option value="NZD">NZD</option>
<option value="MXN">MXN</option>
<option value="SGD">SGD</option>
<option value="HKD">HKD</option>
<option value="NOK">NOK</option>
<option value="SEK">SEK</option>
<option value="RUB">RUB</option>

                    </select>

                    <input type="hidden" name="_action" value="createUser" />
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
                <Form>
          <button type="button" className="btn btn--dark" onClick={onAlreadyHaveAccount}>
              <span>Already have an account ?</span>
              <UserIcon width={20} />
          </button>
      </Form>
            </div>
            <img src={illustration} alt="Person with money" width={600} className="mainimg" />
        </div> 
    )
}

export default Intro
