import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Form, FormGroup, Col, FormControl,
  Checkbox, Button, ControlLabel,
  Image, Label
} from "react-bootstrap";
import { Container, VContainer, HContainer } from "../../components";


const DetailtForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  margin-top: ${props => props.marginTop || '100px'};
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 1em;
  border-top: ${props => props.borderTop ? '2px' : '0px'} solid #818181;

  form {
    width: 80%;
    margin: 20px;
  }
`;

const StyledImage = styled(Image) `
  width: 110px;
  height: 110px;
  margin-right: 20px;
`;
const StyledTextArea = styled(FormControl) `
    margin: 0;
    border: 1px solid #818181;
    text-align: left;
    padding: 5px;
    height: ${ props => props.height || '40px'};
`;

const StyledButton = styled(Button) `
    border: none;
    margin: 15px;
    padding: 6px;
    text-decoration: none;
    font-size: 12px;
    border-radius: 4px;
    background: #cfdeff;
    color: white;
    background-color: #008CBA;
    width: 100px;
    height: 50px;
    position: relative;
    top: 45px;
    bottom: 0;
    :hover{
      background-color: darkblue;
    }
`;

const StyledCol = styled(Col) `
float: ${props => props.float || 'left'};
display:block;
text-align: left;
margin-right: 0;
width: auto;
`;

const StyledLabel = styled(Label) `
display: block;
text-align: center;
margin-left: auto;
margin-right: auto;
width: 200px;
`;

class FascicleItem extends Component {
  render() {
    const c = this.props.comic;

    return (
      <DetailtForm borderTop>
        <StyledImage src={c.thumbnail.path + "." + c.thumbnail.extension} />
        <Form horizontal >
          <FormGroup controlId="formHorizontalEmail">
            <StyledCol componentClass={ControlLabel} sm={2} float="left">
              Título: <span> {c.title}</span>
            </StyledCol>
            <StyledCol componentClass={ControlLabel} sm={2} float="right">
              <ControlLabel>Número da capa: <span> c.issueNumber</span></ControlLabel>
            </StyledCol>
          </FormGroup>
          <FormGroup controlId="formHorizontalPrivateKey">
          </FormGroup>
          <FormGroup controlId="formHorizontalPrivateKey">
            <StyledTextArea type="textarea" placeholder="Descrição da história" readOnly height="100px" value={c.description} />
          </FormGroup>
        </Form>
      </DetailtForm >
    );
  }
}

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterDetail: {},
      data: []
    };
    var marvel = this.props.marvel;
  }
  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.marvel) {
      const c = this.props.characterDetail;
      var that = this;
      this.props.marvel.characters.comics(c.id, 100, 0, function (err, results) {
        if (err) {
          return console.error(err);
        }
        that.setState({ data: results.data });
        // console.log("=============results==========>> " + JSON.stringify(results));
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  handleBack = () => {
    this.props.onBack();
  }

  render() {
    const c = this.props.characterDetail;
    return (
      <VContainer>
        <DetailtForm>
          <StyledImage src={c.thumbnail.path + "." + c.thumbnail.extension} />
          <Form horizontal >
            <FormGroup controlId="formHorizontalPublicKey">
              <StyledTextArea type="textarea" placeholder="nome" readOnly value={c.name} />
            </FormGroup>
            <FormGroup controlId="formHorizontalPrivateKey">
              <StyledTextArea type="textarea" placeholder="Descrição" height="100px" readOnly value={c.description} />
            </FormGroup>
          </Form>
          <StyledButton onClick={this.handleBack}>Voltar</StyledButton>
        </DetailtForm>
        <h1>
          <StyledLabel bsStyle="default">Fascículos </StyledLabel>
        </h1>
        {
          this.state.data.map((item, index) =>
            <FascicleItem key={item.id} comic={item} />)
        }
      </VContainer >
    );
  }
}


// Specifies the default values for props:

DetailtForm.defaultProps = {
  marginTop: '20px',
  borderTop: false
};

DetailtForm.propTypes = {
  marginTop: PropTypes.string,
  borderTop: PropTypes.bool
};

StyledImage.propTypes = {
  ...FormControl.propTypes,
};

StyledTextArea.defaultProps = {
  height: '40px',
};

StyledTextArea.propTypes = {
  ...FormControl.prototype,
  height: PropTypes.string
};

StyledButton.propTypes = {
  ...Button.prototype
};

StyledCol.propTypes = {
  ...Col.prototype
};

FascicleItem.propTypes = {
  ...DetailtForm.propTypes,
};

DetailScreen.defaultProps = {
  characterDetail: {},
}
DetailScreen.propTypes = {
  ...VContainer.propTypes,
  characterDetail: PropTypes.object,
  onBack: PropTypes.func,
  marvel: PropTypes.object,
};



