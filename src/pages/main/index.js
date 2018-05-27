import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import MainScreen from "./MainScreen";

const Main = (props) => {
  return (
    <div>
      <Route path={props.match.url} render={(routeProps) => (
        props.isAuthenticated ? <MainScreen {...routeProps} characters={props.characters} handleChangeDetail={props.handleChangeDetail} /> : <Redirect to='/' />
      )} />
    </div>
  );
};

export { MainScreen };
export default Main;

Main.defaultProps = {
  isAuthenticated: false
};

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleChangeDetail: PropTypes.func.isRequired
};
