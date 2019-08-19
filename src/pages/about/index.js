import React, { Component } from 'react';
import { Container, Col, Image, Row } from 'react-bootstrap';
import './styles.css';

export default class About extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Col xs={{ span: 8, offset: 2 }} >
                        <Image src={require('../../assets/_MG_1739.jpg')} roundedCircle className="profile" />
                        <h3>Christian Grauppe</h3>
                        <p>Hi, I don´t think this page is better that de IMBD, my skills aren´t so great, I´m a Junior in React Front End, and will take a time to make it ... just ok...</p>
                        <p>Oh, by the way, I´m using The Movie Database API version 3, to tet the most newly created movies and series.</p>

                        <Row>
                            <Col xs={6} md={4}>
                            </Col>
                            <Col xs={6} md={4}>
                                <Image src={require('../../assets/tmdb.png')} />
                            </Col>
                            <Col xs={6} md={4}>
                            </Col>
                        </Row>
                        <br />
                        <p>This painting comes right out of your heart. Just let your mind wander and enjoy. This should make you happy. This is truly an almighty mountain. We touch the canvas, the canvas takes what it wants.</p>
                        <p>We'll lay all these little funky little things in there. We'll have a super time. It's so important to do something every day that will make you happy. Maybe there's a happy little Evergreen that lives here. A tree cannot be straight if it has a crooked trunk. Nice little clouds playing around in the sky.</p>
                        <p>Let's put some highlights on these little trees. The sun wouldn't forget them. We have a fantastic little sky! Let's build an almighty mountain.</p>
                        <p>If what you're doing doesn't make you happy - you're doing the wrong thing. I really believe that if you practice enough you could paint the 'Mona Lisa' with a two-inch brush. No pressure. Just relax and watch it happen. Son of a gun.</p>
                        <p>The only prerequisite is that it makes you happy. If it makes you happy then it's good. If I paint something, I don't want to have to explain what it is. We'll make some happy little bushes here. We'll put a happy little sky in here. Let's put some happy little clouds in our world.</p>
                        <p>Don't forget to tell these special people in your life just how special they are to you. It's all a game of angles. It all happens automatically.</p>
                        <p>I think there's an artist hidden in the bottom of every single one of us. For the lack of a better word I call them hangy downs. A little happy sunlight shining through there. Let's go up in here, and start having some fun All you need to paint is a few tools, a little instruction, and a vision in your mind.</p>
                    </Col>
                </Container>
            </div>
        );
    }
}