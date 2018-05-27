import React, { Component } from "react";
import styled from "styled-components";
import { Table, Pagination } from "react-bootstrap"
import PropTypes from "prop-types";
import { Container, VContainer, HContainer } from "../../components";



class CharacterTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleOnClick = (page) => {
    this.props.handleChangeDetail(page);
  }

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Última atualização</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.items.map((page, index) =>
              <tr key={index} onClick={() => this.handleOnClick(page)}>
                <td>{page.name}</td>
                <td>{page.description}</td>
                <td>{page.modified}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    );
  }
}


class CharacterPagination extends Component {

  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <Pagination>
        <Pagination.First disabled={pager.currentPage === 1} onClick={() => this.setPage(1)} />
        <Pagination.Prev disabled={pager.currentPage === 1} onClick={() => this.setPage(pager.currentPage - 1)} />
        {
          pager.pages.map((page, index) =>
            <Pagination.Item key={index} href="#" active={pager.currentPage === page} onClick={() => this.setPage(page)} >{page}</Pagination.Item>
          )
        }
        <Pagination.Next disabled={pager.currentPage === pager.totalPages} onClick={() => this.setPage(pager.currentPage + 1)} />
        <Pagination.Last disabled={pager.currentPage === pager.totalPages} onClick={() => this.setPage(pager.totalPages)} />
      </Pagination>
    );
  }
}

const StyledPane = styled.div`
width: 80%;
text-align: center;
margin: 50px auto;
`;


export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.characters.data,
      pageOfItems: [],
    };
  }

  handleOnClick = (pageOfItems) => {
    this.setState({ pageOfItems: pageOfItems });
  }
  handleChangeDetail = (detail) => {
    this.props.handleChangeDetail(detail);
  }

  render() {
    return (
      <VContainer>
        <StyledPane>
          <CharacterTable items={this.state.pageOfItems} handleChangeDetail={this.handleChangeDetail} />
          <CharacterPagination items={this.state.data} onChangePage={this.handleOnClick} />
        </StyledPane>
      </VContainer>
    );
  }
}

// Specifies the default values for props:

MainScreen.defaultProps = {
};

MainScreen.propTypes = {
  ...VContainer.propTypes,
  characters: PropTypes.object.isRequired,
  handleChangeDetail: PropTypes.func.isRequired
};

CharacterTable.propTypes = {
  ...Table.propTypes,
  items: PropTypes.array.isRequired,
  handleChangeDetail: PropTypes.func.isRequired
};

CharacterPagination.defaultProps = {
  initialPage: 1
};
CharacterPagination.propTypes = {
  ...Pagination.propTypes,
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
};