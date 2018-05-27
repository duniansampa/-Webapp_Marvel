import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import HomeScreen from "./HomeScreen";

const Home = (props) => {
  return (
    <div>
      <Route path={props.match.url} render={(routeProps) => (
        props.isAuthenticated ? <Redirect to='/main' /> : <HomeScreen {...routeProps} handleSubmit={props.handleSubmit} />
      )} />
    </div>
  );
};

export { HomeScreen };
export default Home;

Home.defaultProps = {
  isAuthenticated: false
};

Home.propTypes = {
  isAuthenticated: PropTypes.bool
};

