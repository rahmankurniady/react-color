import React from 'react';
import './login.css';
import { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <h2>Signup</h2>
                <form onSubmit={this.props.doSignup}>
                    <div className="form-group">
                        <label>Email </label>
                        <input type="email" className="form-control" placeholder="Email" onChange={(e) => { this.props.handleChange(e) }} required />
                    </div>
                    <div className="form-group">
                        <label>Username </label>
                        <input type="text" className="form-control" placeholder="Username" onChange={(e) => { this.props.handleChange(e) }} required />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => { this.props.handleChange(e) }} required />
                    </div>
                    <div className="form-check">
                        Already have an account? <a href="/login">Sign In</a>
                    </div>
                    <br></br>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        )
    }
}
