import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class Root extends Component {

  render() {
    return (
        <div className="wrapper">
          <Header />
            { this.props.children }
          <Footer />
        </div>
    );
  }
}

export default Root;
