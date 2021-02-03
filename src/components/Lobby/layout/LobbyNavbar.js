import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Nav, Navbar} from "react-bootstrap";
import {UserContext} from "../account/UserContext";

import pokeLogo from "../../img/pokeball_logo_lobby.png";

function LobbyNavbar({ openTeam }) {

    return(
        <Navbar bg="dark" variant="dark" fixed={"top"}>
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
                <Nav.Link onClick={openTeam}>TEAMBUILDER</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <UserContext.Consumer>
                    { ({ user }) => (
                        <Navbar.Text>
                            Signed in as: <Badge variant={"primary"}>{ user.username }</Badge>
                        </Navbar.Text>
                    )}
                </UserContext.Consumer>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default LobbyNavbar;