import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { find } from 'lodash';

class FeatureRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  renderCell( cycle, featureName ){
    let el = null;
    let modal = null;
    let isInProgress = false;
    const findPrevFeature = (cycle, featureName) => {
      while( (cycle = cycle.prev) ) {
        let feature = find(cycle.features, { name: featureName });
        if (feature) return feature;
      }
    };
    cycle.features.map((feature)=>{
      if (cycle.prev) {
        const prevFeature = findPrevFeature(cycle, feature.name);
        if (prevFeature) {
          isInProgress = feature.test_results.length < prevFeature.test_results.length;
        }
      }
      let { failed, total } = feature.scenarios;
      if(feature.name == featureName){
        const style = failed ? 'danger' : 'success';
        el = (isInProgress && cycle.status === 'in-progress') ? (
          <span
            className={`btn-block btn btn-${style} in-progress`}
            key={`${cycle.cycle_id}${feature.name}_test_results`}
          >
            {failed + '(' + total + ')'}
          </span>
        ) : (
          <Button
            bsStyle={style}
            block
            onClick={this.open}
            key={`${cycle.cycle_id}${feature.name}_test_results`}
          >
            {failed + '(' + total + ')'}
          </Button>
        );
        modal = this.renderModal(feature, cycle);
      }
    });
    return [el, modal];
  }

  renderModal(feature, cycle){
    return (
      <Modal
        show={this.state.showModal}
        onHide={this.close}
        key={`${cycle.cycle_id}${feature.name}_test_results_modal`}>
        <Modal.Header closeButton>
          <Modal.Title>{feature.name} - Tests Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered >
            <thead>
            <tr>
              <th>Test Name</th>
              <th>Failed</th>
              <th>Total</th>
              <th>Test Report</th>
            </tr>
            </thead>
            <tbody>
            {feature.test_results.map((test) => {
              return (
                <tr key={cycle.cycle_id + test.test_name}>
                  <td>{test.test_name}</td>
                  <td>{test.scenarios.failed}</td>
                  <td>{test.scenarios.total}</td>
                  <td><a href={test.report_url} target="_blank">Show test report >> </a> </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    const { cycle, featureName } = this.props;
    return (
      <td key={featureName + cycle.cycle_id}>
        {this.renderCell( cycle, featureName )}
      </td>
    );
  }
}

export default FeatureRenderer;

