import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>E-Serve</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className="ml-auto">
              {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer> */}
              <NavDropdown title="Rent">
                <LinkContainer to="/rentposts">
                  <NavDropdown.Item>Rent Posts</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/createrentpost">
                  <NavDropdown.Item>Add post</NavDropdown.Item>
                </LinkContainer>
                {userInfo ? (
                  <>
                    <LinkContainer to="/offerssent">
                      <NavDropdown.Item>Offers Sent</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/offersreceived">
                      <NavDropdown.Item>Offers Recieved</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/myrentedfromproducts">
                      <NavDropdown.Item>My Items Rented Out</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/myrentedproducts">
                      <NavDropdown.Item>Items Rented</NavDropdown.Item>
                    </LinkContainer>
                  </>
                ) : null}
              </NavDropdown>
              <NavDropdown title="Community Service">
                <LinkContainer to="/communityserviceposts">
                  <NavDropdown.Item>Community Service Posts</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/createcommunityservicepost">
                  <NavDropdown.Item>Add post</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/communityservice/offerssent">
                  <NavDropdown.Item>Offers Sent</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/communityservice/offersreceived">
                  <NavDropdown.Item>Offers Recieved</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/communityservice/collectedby">
                  <NavDropdown.Item>Items Collected</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {
                <NavDropdown title="Paid Service">
                  <LinkContainer to="/paidservices">
                    <NavDropdown.Item>Available Paid Sevices</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/createpaidservice">
                    <NavDropdown.Item>Create Paid Service</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              }

              <LinkContainer to="/Map">
                <Nav.Link>Map</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <LinkContainer to="/chat">
                  <Nav.Link>
                     Chat
                  </Nav.Link>
                </LinkContainer>
              ) : (
                ""
              )}

{
                  userInfo ?
                  <NavDropdown title="Orders">
                  <LinkContainer to='/buyersorderhistory'>
                    <NavDropdown.Item>Orders Bought</NavDropdown.Item>
                  </LinkContainer>

                    <LinkContainer to='/sellersorderhistory'>
                    <NavDropdown.Item>Services Sold</NavDropdown.Item>
                  </LinkContainer>
                  </NavDropdown>
                  :''
                }

                
{
                  userInfo ?
                  <NavDropdown title="Disputes">
                  <LinkContainer to={`/myconflicts/${userInfo._id}`}>
                    <NavDropdown.Item>My Disputes</NavDropdown.Item>
                  </LinkContainer>

                    {/* <LinkContainer to='/sellersorderhistory'>
                    <NavDropdown.Item>Services Sold</NavDropdown.Item>
                  </LinkContainer> */}
                  </NavDropdown>
                  :''
                }

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/feedback">
                    <NavDropdown.Item>Feedback</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/rent">
                    <NavDropdown.Item>Rent Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/services">
                    <NavDropdown.Item>Paid Services Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/communityservices/">
                    <NavDropdown.Item>Community Service Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/dashboard/">
                    <NavDropdown.Item>Analytics</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Service Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/rentcontracts">
                    <NavDropdown.Item>Rent Contracts</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
