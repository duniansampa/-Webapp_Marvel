import React, { Component } from "react";
import marvelApi from "marvel-api";
import createBrowserHistory from 'history/createBrowserHistory'
import "./App.css";

import {
  Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { Header, Footer } from "./components";

import {
  Home,
  Main,
  Detail,
} from "./pages";

const customHistory = createBrowserHistory()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      characterDetail: {}
    };
    let characters = {};
    let marvel;
  }
  handleSubmit = async (value) => {
    try {
      console.log(JSON.stringify(value));
      this.marvel = marvelApi.createClient({
        publicKey: value.publicKey,
        privateKey: value.privateKey
      });
      var that = this;
      this.marvel.characters.findAll(100, 0, function (err, results) {
        if (err) {
          that.setState({ isAuthenticated: false });
          return alert("Your keys are invalid. " + err);
        }
        that.characters = results;
        that.setState({ isAuthenticated: true });
      });
    } catch (e) {
      alert(e.message);
    }
  }

  handleBack = () => {
    this.setState({ characterDetail: {} });
    customHistory.push("/main");
  };

  handleChangeDetail = (characterDetail) => {
    this.setState({ characterDetail: characterDetail });
    console.log("===========Main:handleChangeDetail ============>> ");
    customHistory.push("/detail");
  }
  render() {

    return (
      <Router history={customHistory}>
        <div>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" render={(routeProps) => (
              <Home {...routeProps} handleSubmit={this.handleSubmit} isAuthenticated={this.state.isAuthenticated} />
            )} />
            <Route path="/main" render={(routeProps) => (
              <Main {...routeProps} characters={this.characters} isAuthenticated={this.state.isAuthenticated} handleChangeDetail={this.handleChangeDetail} />
            )} />
            <Route path="/detail" render={(routeProps) => (
              <Detail {...routeProps} isAuthenticated={this.state.isAuthenticated} characterDetail={this.state.characterDetail} marvel={this.marvel} onBack={this.handleBack} />
            )} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

