import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Container, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Register from '../rigister/register';
import Login from '../login/login'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBalanceScale, faCoins, faExchangeAlt, faCog} from '@fortawesome/free-solid-svg-icons';

const AppHeader = () =>{

    const [registerShow, setRegisterShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
  
    const handleClose = (modal) => modal(false);
    const handleShow = (modal) =>{modal(true)};

    return (
        <>
        <Register show={registerShow} handleClose={()=>handleClose(setRegisterShow)}/>
        <Login show={loginShow} handleClose={()=>handleClose(setLoginShow)}/>
        <Navbar bg="light" expand="lg">
            <Container>
                <Row className={'w-'+100}>
                    <Col xs={3}>
                        <Navbar.Brand href="#home">My Cash</Navbar.Brand>
                    </Col>
                    <Col xs={6}>
                        <Nav className="d-flex flex-row justify-content-around mt-2">
                            <Link to='#'>
                                <FontAwesomeIcon icon={faBalanceScale} /> 
                            </Link>
                            <Link to='#'>
                                <FontAwesomeIcon icon={faCoins} />
                            </Link>
                            <Link to='#'>
                            <FontAwesomeIcon icon={faExchangeAlt} />
                            </Link>
                            <Link to='#'>
                                <FontAwesomeIcon icon={faCog} />
                            </Link>
                        </Nav>
                    </Col>
                    <Col xs={3} className={'d-flex justify-content-end'}>
                        <NavDropdown  title="Sign in" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>handleShow(setLoginShow)} href="#">Log in</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>handleShow(setRegisterShow)} href="#">Register</NavDropdown.Item>
                        </NavDropdown>
                    </Col>
                </Row>
            </Container>
        </Navbar>
        </>
    )
}

export default AppHeader;