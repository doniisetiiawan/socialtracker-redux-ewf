/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Jumbotron,
  Row,
  Table,
} from 'react-bootstrap';
import ArrayUtil from '../utils/array';

class SocialTracker extends Component {
  constructor(props) {
    super(props);

    this.state = { twitter: 'twitter', reddit: 'reddit' };
  }

  componentDidMount = () => {
    this.syncFeed();
  };

  renderFeed = () => {
    const { feed } = this.props.social;
    const feedCollection = ArrayUtil.in_groups_of(feed, 3);
    if (feed.length > 0) {
      return feedCollection.map((feedGroup, index) => {
        console.log(feedGroup);
        return (
          <Row key={`${feedGroup[0].id}${index}`}>
            {feedGroup.map((feed) => {
              if (feed.type == 'tweet') {
                return (
                  <Col md={4} key={feed.id}>
                    <div className="well twitter">
                      <p>{feed.text}</p>
                    </div>
                  </Col>
                );
              }
              const display = feed.selftext == ''
                ? `${feed.title}: ${feed.url}`
                : feed.selftext;
              return (
                <Col md={4} key={feed.id}>
                  <div className="well reddit">
                    <p>{display}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        );
      });
    }
    return <div />;
  };

  changeTwitterSource = (event) => {
    this.setState({ twitter: event.target.value });
  };

  changeRedditSource = (event) => {
    this.setState({ reddit: event.target.value });
  };

  syncFeed = () => {
    const { fetchTweets, fetchReddits } = this.props;
    fetchReddits(this.state.reddit);
    fetchTweets(this.state.twitter);
    console.log('syncFeed was called');
  };

  render() {
    console.log('render props');
    console.log(this.props);

    const { filterTweets, filterReddits } = this.props;
    const { showTweets, showReddits } = this.props.social;
    return (
      <Container>
        <Jumbotron>
          <h1>Social Media Tracker</h1>
        </Jumbotron>
        <Row>
          <Col xs={12} md={12}>
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
                      onChange={filterTweets}
                      checked={showTweets}
                    />
                  </td>
                  <td>
                    <Form.Control
                      onChange={this.changeTwitterSource}
                      type="text"
                      value={this.state.twitter}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <Form.Control
                      type="checkbox"
                      label="Reddit"
                      onChange={filterReddits}
                      checked={showReddits}
                    />
                  </th>
                  <td>
                    <Form.Control
                      onChange={this.changeRedditSource}
                      type="text"
                      value={this.state.reddit}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={this.syncFeed}
                      block
                    >
                      Sync Feed
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        {this.renderFeed()}
      </Container>
    );
  }
}

export default SocialTracker;
