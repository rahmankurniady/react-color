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
      id: '',
      color_blue: 0,
      color_red: 0,
      color_green: 0,
      color_yellow: 0,
      color_purple: 0,
      show_form_color: false,
      date: ''
    }
  }


  handleCheck = (event) => {
    var val;
    if (event.target.checked === true) {
      val = 1;
    }
    else {
      val = 0;
    }
    this.setState({
      [event.target.name]: val
    });
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
          ReactSession.set('username', response[0].username);
          window.location.reload();

        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  doSignup = (event) => {
    event.preventDefault();

    if (!this.state.email) {
      return;
    }
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    fetch("http://localhost:5000/doSignup", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    }).then(response => response.json())
      .then(response => {

        alert(response.msg);

        if (response.success !== "false") {
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  doLogout = (event) => {
    ReactSession.set('id', '');
    ReactSession.set('username', '');
    window.location.reload();
  }

  submitColor = (event) => {
    event.preventDefault();



    if ((this.state.color_blue === 0) && (this.state.color_red === 0) && (this.state.color_green === 0) && (this.state.color_yellow === 0) && (this.state.color_purple === 0)) {
      alert("Please Select Color Before Submit")
    }
    else {
      fetch("http://localhost:5000/putColor", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          id: ReactSession.get('id'),
          color_blue: this.state.color_blue,
          color_red: this.state.color_red,
          color_green: this.state.color_green,
          color_yellow: this.state.color_yellow,
          color_purple: this.state.color_purple
        })
      }).then(response => response.json())
        .then(response => {
          alert(response.msg);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }


  }

  async componentDidMount() {

    if (ReactSession.get('id') !== '') {
      fetch("http://localhost:5000/getcolor", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          id_user: ReactSession.get('id'),
        })
      }).then(response => response.json())
        .then(response => {
          if (response[0].success === 'false') {
            this.setState({
              show_form_color: true
            })
          }
          else {
            this.setState({
              color_blue: response[0].color_blue,
              color_red: response[0].color_red,
              color_green: response[0].color_green,
              color_yellow: response[0].color_yellow,
              color_purple: response[0].color_purple,
              show_form_color: false
            })
          }

          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var d = new Date();
          var dayName = days[d.getDay()];

          this.setState({
            date: dayName
          });

        })
        .catch(err => {
          console.log(err);
        });
    }
  }


  render() {
    ReactSession.setStoreType("localStorage");

    return (
      <Router>
        <Switch>
          <Route exact path='/'
            render={(props) => (
              <Home {...this.state} doLogout={this.doLogout} handleCheck={this.handleCheck} submitColor={this.submitColor} />
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
              <Signup {...this.state} handleChange={this.handleChange} doSignup={this.doSignup} isAuthed={true} />
            )}
          />
        </Switch>

      </Router>
    );
  }
}

export default App;

