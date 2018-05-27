// eslint-disable-next-line
import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
flex-direction: ${props => props.horizontal ? 'column' : 'row'};
height: 100%;
width: 100%;
left: 0;
top: 0;
overflow: auto;
`;

export default Container;

Container.defaultProps = {
    horizontal: true
};

Container.propTypes = {
    horizontal: PropTypes.bool
};
