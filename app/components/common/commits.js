import React, { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

export class CommitRenderer extends Component {
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

  render() {
    const { cycle } = this.props;
    return (
      <div>
        <Button
          style={cycle.commits.length ? { fontWeight: 'bold' } : {}}
          block
          onClick={this.open}
          disabled={cycle.commits.length ? false : true }
        >
          {cycle.commits.length ? 'Commits' : 'No commits'}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Commits</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered>
              <thead>
              <tr>
                <th>Commited by</th>
                <th>Project</th>
                <th>Stack</th>
                <th>Comment</th>
              </tr>
              </thead>
              <tbody>
            {cycle.commits.map((commit) => {
              return (
              <tr key={commit.hash}>
                <td>{commit.committedBy}</td>
                <td>{commit.project}</td>
                <td>{commit.stack} </td>
                <td>{commit.comment}</td>
              </tr>
              );
            })}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CommitRenderer;
