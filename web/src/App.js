import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
//import { Redirect } from "react-router-dom";

import Home from './component/home';
import Login from './component/login';
import Signup from './component/signup';



class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      username: '',
      password: '',
      id: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  doLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/dologin", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json())
      .then(response => {
        console.log(response.success)

        if (response.success === "false") {
          alert(response.msg);
        }
        else {
          ReactSession.set('id', response[0].id);
          window.location.reload();

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  doSignup = (event) => {
    event.preventDefault();

    alert("Account and berhasil di buat");

  }

  doLogout = (event) => {
    ReactSession.set('id', '');
    window.location.reload();
  }

  render() {
    ReactSession.setStoreType("localStorage");

    return (
      <Router>
        <Switch>
          <Route exact path='/'
            render={(props) => (
              <Home {...this.state} doLogout={this.doLogout} />
            )}
          />

          <Route
            path='/login'
            render={(props) => (
              <Login {...this.state} handleChange={this.handleChange} doLogin={this.doLogin} isAuthed={true} />
            )}
          />
          <Route path='/signup'
            render={(props) => (
              <Signup {...this.state} handleChange={this.handleChange} doSignup={this.doSignup} />
            )}
          />
        </Switch>

      </Router>
    );
  }
}

export default App;

