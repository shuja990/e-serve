import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>E-Serve</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className='ml-auto'>
              {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer> */}
              <NavDropdown title="Rent">
                   <LinkContainer to='/rentposts'>
                    <NavDropdown.Item>Rent Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/createrentpost'>
                    <NavDropdown.Item>Add post</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown title="Community Service">
                   <LinkContainer to='/communityserviceposts'>
                    <NavDropdown.Item>Community Service Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/createcommunityservicepost'>
                    <NavDropdown.Item>Add post</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                {
                  userInfo?
                  <NavDropdown title="Paid Service">
                   <LinkContainer to='/paidservices'>
                    <NavDropdown.Item>Available Paid Sevices</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/createpaidservice'>
                    <NavDropdown.Item>Create Paid Service</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                  :''
                }

                <NavDropdown title="E-Map">
                <LinkContainer to='/map'>
                    <NavDropdown.Item>View Map</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                   
                  
                  
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/dashboard'>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/rent'>
                    <NavDropdown.Item>Rent Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/services'>
                    <NavDropdown.Item>Paid Services Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/communityservices/'>
                    <NavDropdown.Item>Community Service Posts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/dashboard/'>
                    <NavDropdown.Item>Analytics</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
