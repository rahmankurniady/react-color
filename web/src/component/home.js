
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
                    <h1>Selamat Datang di program colorPicker</h1>
                    jika sudah memilih warna maka muncul list warna, jika belum memilih warna maka muncul pilihan warna
                    <button onClick={this.props.doLogout}>signout</button>
                </div>
            )
        }
    }

}
