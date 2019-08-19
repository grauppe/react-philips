import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

export default class AOA extends Component {
    render() {
        return (
            <Container >
                <Row noGutters>
                    <Col className="texto" md={{ offset: 7 }} >
                            <h1>Error NOT FOUND</h1>
                            <p>it wasn't me that you are looking for?</p>
                            <Link to="/">
                                <Button variant="primary"> Ok, try again... </Button>
                            </Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}