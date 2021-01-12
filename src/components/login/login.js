import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addErrorLogin, addErrorLoginMessage} from '../../actions';
import {Button, Modal, Form} from 'react-bootstrap';
import firebase from "firebase/app";
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SpinnerSmall from '../spinner-small/spinner-small';
import "firebase/auth";

function Login({show, handleClose, error, errorMessage, addErrorLogin, addErrorLoginMessage}) {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    
    

    const onPasswordVisible = (e)=> {
        const input = e.currentTarget.previousSibling;
        input.setAttribute('type', 'text');
    }

    const onPasswordNoVisible = (e)=> { 
        const input = e.currentTarget.previousSibling;           
        input.setAttribute('type', 'password');
    }

    const onSetPassword = (e) => {
        setUser({...user, password: e.target.value});
        setValidated(false);
    }

    

    const onRegister = (e) =>{
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }
        
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            setLoading(false)
            addErrorLogin(false);
            handleClose();
            setValidated(false);
        })
        .catch((error) => {
            const errorMessage = error.message;
            addErrorLogin(true);
            setLoading(false)
            addErrorLoginMessage(errorMessage)  
        });

    }

    const spiner = loading ? <SpinnerSmall/> : '';

    return (
        <Modal show={show}  onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={onRegister}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required  onChange={(e)=>setUser({...user, email: e.target.value})} type="email" placeholder="Enter email" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control pattern="[0-9a-zA-Z!@#$%^&*]{6,}" required onChange={onSetPassword} type="password" placeholder="Password" />
                        <FontAwesomeIcon onMouseDown={onPasswordVisible} onMouseUp={onPasswordNoVisible} className='look-password' icon={faEye} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group required controlId="formBasicCheckbox">
                        <Form.Check required type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <div>{error ? errorMessage : ''}</div>
                    {spiner}
                </Form>
            </Modal.Body>
        </Modal>
    );
  }
  
  const mapStateToProps = ({error, errorMessage}) => {
      return {
          error: error.errorLogin,
          errorMessage: errorMessage.messageLogin
      }
  }

  export default connect(mapStateToProps, {addErrorLogin, addErrorLoginMessage})(Login);