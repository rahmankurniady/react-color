
import React from 'react';
import './login.css'
// import { ReactSession } from 'react-client-session';
// import { Redirect } from "react-router-dom";
import { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <h2>Login</h2>
                <form onSubmit={doLogin}>
                    <div className="form-group">
                        <label>Email </label>
                        <input type="email" className="form-control" placeholder="email" onChange={(e) => { this.props.handleChange(e) }} required />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => { this.props.handleChange(e) }} />
                    </div>
                    <div className="form-check">
                        don't have an account?  <a href="/signup">SignUp</a>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
                </form>
            </div>
        )
    }

}


function doLogin(event) {
    event.preventDefault();
    //ReactSession.set('id', '1');

    fetch("http://localhost:5000/dologin", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify({
            email: 'rahmankurniady@gmail.com',
            password: 'rahman'
        })
    }).then(response => response.json())
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err);
        });
}