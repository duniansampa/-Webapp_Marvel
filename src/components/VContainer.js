// eslint-disable-next-line
import React, { Component } from "react";
import styled from "styled-components";
import Container from "./Container";

const VContainer = styled.div`
display: block;
margin:auto;
`;

export default VContainer;


VContainer.defaultProps = {
};

VContainer.propTypes = {
    ...Container.prototype
};
