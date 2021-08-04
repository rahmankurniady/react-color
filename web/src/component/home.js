
import { Redirect } from "react-router-dom";
import React from 'react';
import { ReactSession } from 'react-client-session';
import { Component } from 'react'

export default class Home extends Component {
    render() {
        if (ReactSession.get('id') === "") {
            return <Redirect to='/login' />
        }
        else {
            return (
                <div>
                    <h1>Welcome to the world of Geeks!</h1>
                    <button onClick={doLogout}>signout</button>
                </div>
            )
        }
    }

}

function doLogout() {
    ReactSession.set('id', '');
    window.location.reload();
}