import React, { Component } from 'react';
import { uniqBy } from 'lodash';
import Markup from './Markup';


class SearchTool extends Component {
  state = {
    content: '',
    results: [],
    details: [],
  }

  fetchDetails = (id) => {
    fetch(`https://mpr.code4sa.org/api/v2/detail?nappi=${id}`)
      .then(response => response.json())
      .then((parsedJSON) => {
        const details = uniqBy(parsedJSON, 'nappi_code');
        console.log(parsedJSON);
        return this.setState({ details });
      });
  };

  fetchGenerics = (id) => {
    fetch(`https://mpr.code4sa.org/api/v2/related?nappi=${id}`)
      .then(response => response.json())
      .then((parsedJSON) => {
        const results = uniqBy(parsedJSON, 'nappi_code');
        return this.setState({ results });
      });
  };

  fetchBasicSearch = (content) => {
    fetch(`https://mpr.code4sa.org/api/v2/search?q=${content}`)
      .then(response => response.json())
      .then((parsedJSON) => {
        const results = uniqBy(parsedJSON, 'nappi_code');
        return this.setState({ results });
      });
  }

  submitForm = (event) => {
    event.preventDefault();
    this.setState({ content: '' });
  }

  changeHandler = (event) => {
    this.setState({ content: event.target.value }, () => {
      const { content } = this.state;
      if (content && content.length > 3) {
        this.fetchBasicSearch(content);
      }
    });
  }

  render() {
    const { state } = this;

    const passedProps = {
      content: state.content,
      results: state.results,
      details: state.details,
      changeHandler: this.changeHandler,
      submitForm: this.submitForm,
      fetchGenerics: this.fetchGenerics,
      fetchDetails: this.fetchDetails,
    };

    return <Markup {...passedProps} />;
  }
}


export default SearchTool;
