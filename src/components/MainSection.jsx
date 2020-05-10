/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import assign from 'object-assign';
import {
  Col,
  Row,
  Table,
  Form,
  Button,
} from 'react-bootstrap';
import SocialStore from '../stores/SocialStore';
import SocialActions from '../actions/SocialActions';

class MainSection extends Component {
  constructor(props) {
    super(props);

    this.state = assign(
      { twitter: 'twitter', reddit: 'twitter' },
      SocialStore.getState(),
    );
  }

  syncFeed = () => {
    SocialActions.fetchReddits(this.state.reddit);
    SocialActions.fetchTweets(this.state.twitter);
  };

  componentDidMount = () => {
    SocialStore.addChangeListener(this._onChange);
    this.syncFeed();
  };

  componentWillUnmount = () => {
    SocialStore.removeChangeListener(this._onChange);
  };

  changeTwitterSource = (event) => {
    this.setState({ twitter: event.target.value });
  };

  changeRedditSource = (event) => {
    this.setState({ reddit: event.target.value });
  };

  render() {
    return (
      <Row>
        <Col xs={8} md={8} mdOffset={2}>
          <Table striped hover>
            <thead>
              <tr>
                <th width="200">Feed Type</th>
                <th>Feed Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    id="test"
                    type="checkbox"
                    label="Twitter"
                    onChange={SocialActions.filterTweets}
                    checked={this.state.showTweets}
                  />
                </td>
                <td>
                  <Form.Control
                    onChange={this.changeTwitterSource}
                    type="text"
                    addonBefore="@"
                    value={this.state.twitter}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <Form.Control
                    type="checkbox"
                    label="Reddit"
                    onChange={SocialActions.filterReddits}
                    checked={this.state.showReddits}
                  />
                </th>
                <td>
                  <Form.Control
                    onChange={this.changeRedditSource}
                    type="text"
                    addonBefore="@"
                    value={this.state.reddit}
                  />
                </td>
              </tr>
              <tr>
                <th />
                <td>
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.syncFeed}
                  >
                    Sync Feed
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default MainSection;
