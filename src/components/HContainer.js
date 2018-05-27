// eslint-disable-next-line
import React, { Component } from "react";
import styled from "styled-components";
import Container from "./Container";

const HContainer = styled(Container) `
flex-direction: row;
align-items: flex-start;
`;

export default HContainer;

HContainer.defaultProps = {
};

HContainer.propTypes = {
    ...Container.prototype
};
