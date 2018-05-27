import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import DetailScreen from "./DetailScreen";

const Detail = (props) => {
  return (
    <div>
      <Route path={props.match.url} render={(routeProps) => (
        props.isAuthenticated ? <DetailScreen {...routeProps} characterDetail={props.characterDetail} onBack={props.onBack} marvel={props.marvel} /> : <Redirect to='/' />
      )} />
    </div>
  );
};

export { DetailScreen };
export default Detail;


Detail.defaultProps = {
  isAuthenticated: false
};

Detail.propTypes = {
  isAuthenticated: PropTypes.bool,
  characterDetail: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  marvel: PropTypes.object.isRequired
};
