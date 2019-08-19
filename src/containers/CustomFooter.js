
import React from 'react';
import { Navbar} from 'react-bootstrap';

export default class CustomNavBar extends React.Component {
    render() {
        return (
            <div className="footerPage">
                <Navbar sticky="bottom" expand="lg" bg="dark" variant="dark">
                    <Navbar.Text>
                        {'YBMs 2019 - Written in React by Christian Grauppe'}
                    </Navbar.Text>
                </Navbar>
            </div>
        )
    }
}