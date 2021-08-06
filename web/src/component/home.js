
import { Redirect } from "react-router-dom";
import React from 'react';
import { ReactSession } from 'react-client-session';
import { Component } from 'react'
import Formcolor from './formcolor';
import Tablecolor from "./tablecolor";

export default class Home extends Component {
    render() {
        if (ReactSession.get('id') === "") {
            return <Redirect to='/login' />
        }
        else {
            return (
                <div>
                    <h1>Welcome Back {ReactSession.get('username')} </h1>
                    <p>Today is {this.props.date}</p>
                    {
                        (this.props.show_form_color === false) ?
                            <Tablecolor {...this.props} />
                            :
                            <Formcolor submitColor={this.props.submitColor} handleCheck={this.props.handleCheck} />
                    }
                    <button onClick={this.props.doLogout}>signout</button>
                </div>
            )
        }
    }

}
