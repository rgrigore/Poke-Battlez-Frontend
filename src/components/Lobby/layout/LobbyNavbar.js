import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";

import pokeLogo from "../../img/pokeball_logo_lobby.png";

function LobbyNavbar() {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/lobby">
                <img
                    alt="pokeball"
                    src={pokeLogo}
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                />{' '}
                Poke Battlez
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/teambuilder">TEAMBUILDER</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">Poke Baller</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default LobbyNavbar;