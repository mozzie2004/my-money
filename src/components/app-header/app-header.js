import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Container, Col, Row, Popover, OverlayTrigger} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Register from '../rigister/register';
import Login from '../login/login'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBalanceScale, faCoins, faExchangeAlt, faCog} from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';
import {addErrorLogin, countsLoaded} from '../../actions';

const AppHeader = ({curentUser, addErrorLogin}) =>{

    const [registerShow, setRegisterShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
  
    const handleClose = (modal) =>{ 
        modal(false);
        addErrorLogin(false);
    };
    const handleShow = (modal) =>{modal(true)};

    const onOut = () => {
        firebase.auth().signOut().then(() => {
          }).catch((error) => {
            console.log(error)
          });
    }


    const popover = (title) => {
      return  (
            <Popover id="popover-basic">
              <Popover.Title as="h3">{title}</Popover.Title>
            </Popover>
          );
    } 
    let signIn = null;
    if (!curentUser) {
         signIn = (
            <NavDropdown  title="Sign in" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={()=>handleShow(setLoginShow)} href="#">Log in</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>handleShow(setRegisterShow)} href="#">Register</NavDropdown.Item>
            </NavDropdown>
        ) 
    } else {
        const userName = curentUser.email.substring(0, curentUser.email.indexOf('@'));
        signIn = (
            <NavDropdown  title={userName} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={onOut} href="#">Log out</NavDropdown.Item>
            </NavDropdown>
        )
    }

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
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover('Мої рахунки')}>
                            <Link to='/'>
                                <FontAwesomeIcon icon={faBalanceScale} /> 
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover('Бюджети')}>
                            <Link to='#'>
                                <FontAwesomeIcon icon={faCoins} />
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover('Транзакції')}>
                            <Link to='/operations'>
                                <FontAwesomeIcon icon={faExchangeAlt} />
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover('Налаштування')}>
                        <Link to='#'>
                                <FontAwesomeIcon icon={faCog} />
                            </Link>
                        </OverlayTrigger>
                        </Nav>
                    </Col>
                    <Col xs={3} className={'d-flex justify-content-end'}>
                        {signIn}
                    </Col>
                </Row>
            </Container>
        </Navbar>
        </>
    )
}

const mapStateToProps = ({curentUser}) => {
    return {
        curentUser
    }
}

const mapDispatchToProps = {
    addErrorLogin,
    countsLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);