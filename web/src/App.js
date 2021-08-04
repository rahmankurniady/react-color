import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

import Home from './component/home';
import Login from './component/login';
import Signup from './component/signup';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleChange(e) {
    console.log("asdads");
  }

  render() {
    ReactSession.setStoreType("localStorage");

    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route
            path='/login'
            render={(props) => (
              <Login {...this.state} handleChange={this.handleChange} isAuthed={true} />
            )}
          />
          <Route path='/signup'
            render={(props) => (
              <Signup {...this.state} handleChange={this.handleChange} />
            )}
          />
        </Switch>

      </Router>
    );
  }
}

export default App;

