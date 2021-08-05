
import React from 'react';
import './login.css'
import { ReactSession } from 'react-client-session';
import { Redirect } from "react-router-dom";
import { Component } from 'react'

export default class Login extends Component {

    render() {
        if (ReactSession.get('id') === "") {
            return (
                <form onSubmit={this.props.doLogin}>
                    <div className="login-wrapper">
                        <h2>Login</h2>

                        <div className="form-group">
                            <label>Email </label>
                            <input type="email" className="form-control" placeholder="email" name="email" value={this.props.email} onChange={(e) => { this.props.handleChange(e) }} required />
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.props.password} onChange={(e) => { this.props.handleChange(e) }} />
                        </div>
                        <div className="form-check">
                            don't have an account?  <a href="/signup">SignUp</a>
                        </div>
                        <br></br>
                        <button className="btn btn-primary btn-lg btn-block">Submit</button>
                    </div>
                </form>
            )
        }
        else {
            return <Redirect to='/' />
        }

    }
}



