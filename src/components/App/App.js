import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      confMsg: ''
    }
    this.submitNewUrl = this.submitNewUrl.bind(this)
  }

  componentDidMount() {
    getUrls()
      .then(allUrls => this.setState({ urls: allUrls.urls }))
  }

  submitNewUrl(usersUrl) {
    const postReq = { method: 'POST', body: JSON.stringify(usersUrl), headers: {'content-type': 'application/json'} }
    postUrl(postReq)
      .then(() => this.setState({ confMsg: "Success!"}))
  }

  render() {
    // console.log(this.state.urls)
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitNewUrl={this.submitNewUrl}/>
          <p>{ this.state.confMsg }</p>
        </header>

        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;
