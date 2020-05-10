import React from 'react';
import { Jumbotron, Row } from 'react-bootstrap';

function Header() {
  return (
    <Row>
      <Jumbotron className="center-text">
        <h1>Social Media Tracker</h1>
      </Jumbotron>
    </Row>
  );
}

export default Header;
