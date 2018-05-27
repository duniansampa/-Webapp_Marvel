import React, { Component } from "react";
import styled from "styled-components";
import {
  Form, FormGroup, Col, FormControl,
  Checkbox, Button, ControlLabel
} from "react-bootstrap";
import PropTypes from "prop-types";
import { Container } from "../../components";


const LoginForm = styled.div`
    width:80%;
    background-color: #8b9dc3;
    border: 1px solid white;
    margin: 50px auto 0;
    padding: 1em;
    border-radius: 10px;
    text-align: center;
    font-size: 40px;
`;

const StyledForm = styled(Form) `
input[type=text], input[type=password] {
    text-align:center;
    display: block;
    margin: 0 auto 1em auto;
    width: 90%;
    border: 1px solid #818181;
    padding: 5px;
}

input[type=submit] , form a {
    border: none;
    margin-right: auto;
    margin-left: auto;
    padding: 6px;
    text-decoration: none;
    font-size: 12px;
    border-radius: 4px;
    background: #cfdeff;
    color: black;
    box-shadow: 0 1px 0 white;
    background-color: black;
}

button[type=submit]:hover, form a:hover {
    background: #007cc2;
    cursor: pointer;
}
`;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: '',
      privateKey: ''
    };
  }
  handleChangePublic = (e) => {
    this.setState({ publicKey: e.target.value });
  }
  handleChangePrivate = (e) => {
    this.setState({ privateKey: e.target.value });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const value = this.state;
    await this.props.handleSubmit(value);
  }

  render() {
    var { publicKey, privateKey } = this.state;
    return (
      <Container>
        <LoginForm >
          <StyledForm horizontal onSubmit={this.handleSubmit}>
            <FormGroup controlId="formHorizontalLabel" validationState="success">
              <ControlLabel>Dados de acesso</ControlLabel>{' '}
            </FormGroup>
            <FormGroup controlId="formHorizontalPublicKey" validationState="success">
              <FormControl type="text" placeholder="public_key" value={publicKey} onChange={this.handleChangePublic} />
            </FormGroup>
            <FormGroup controlId="formHorizontalPrivateKey">
              <FormControl type="text" placeholder="private_key" value={privateKey} onChange={this.handleChangePrivate} />
            </FormGroup>
            <FormGroup controlId="formHorizontalButton" validationState="success">
              <Button type="submit">Acessar</Button>
            </FormGroup>
          </StyledForm>
        </LoginForm>
      </Container >
    );
  }
}


// Specifies the default values for props:

StyledForm.propTypes = {
  ...Form.propTypes,
};

HomeScreen.propTypes = {
  ...Container.propTypes,
  handleSubmit: PropTypes.func.isRequired
};
