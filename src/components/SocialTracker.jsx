/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import assign from 'object-assign';
import Header from './Header';
import MainSection from './MainSection';
import SocialStore from '../stores/SocialStore';
import ArrayUtil from '../utils/array';

class SocialTracker extends Component {
  constructor(props) {
    super(props);

    this.state = assign({}, SocialStore.getState());
  }

  componentDidMount = () => {
    SocialStore.addChangeListener(this._onChange);
  };

  componentWillUnmount = () => {
    SocialStore.removeChangeListener(this._onChange);
  };

  renderFeed = () => {
    const { feed } = this.state;
    console.log(feed);
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

  _onChange = () => {
    this.setState(SocialStore.getState());
  };

  render() {
    return (
      <Container>
        <Header />
        <MainSection />
        {this.renderFeed()}
      </Container>
    );
  }
}

export default SocialTracker;
