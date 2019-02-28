import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { fetchCycles } from 'actions/cycles';



export default function (ComposedComponent) {
  class AutoUpdate extends Component {
    componentDidMount() {
      const { fetchCycles } = this.props;
      fetchCycles();
      // this.fetchData();
    }

    // fetchData() {
    //   const { fetchCycles } = this.props;
    //   fetchCycles();
    //   setTimeout(() => this.fetchData(), 2000);
    // }

    render () {
      const { error } = this.props;
      if (error) {
        return (
          <div>Ooops!! something went wrong!!</div>
        );
      }
      return (
        <ComposedComponent
          {...this.props}
        />
      );
    }
  }

  AutoUpdate.propTypes = {
    cycles: PropTypes.array,
    fetchCycles: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired
  };

  const mapStateToProps = ({ cycles }) => ({
    cycles: cycles.list,
    error: cycles.error
  });

  return connect(mapStateToProps, { fetchCycles })(AutoUpdate);
}
