import React, {useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../account/UserContext";
import { Badge } from "react-bootstrap";

import pokeLogo from "../../img/pokeball_logo_lobby.png";

function LobbyNavbar() {
    const user = useContext(UserContext)[0];

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
                    Signed in as:<Badge variant={"primary"}>{ user }</Badge>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default LobbyNavbar;