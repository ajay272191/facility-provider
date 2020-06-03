import React  from "react";

import { Link} from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ErrorBoundary from "./components/ErrorBoundary";

import Routes from "./Routes";
import "./App.css";

function App() {

  return (
   (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>

                <>
                <LinkContainer to="/Details">
                  <NavItem>Details</NavItem>
                </LinkContainer>
                <LinkContainer to="/Reservation">
                  <NavItem>Reserve</NavItem>
                </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ErrorBoundary>

            <Routes />
        </ErrorBoundary>
      </div>
    )
  );
}

export default App;
