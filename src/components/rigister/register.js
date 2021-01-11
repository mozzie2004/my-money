import React, {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import firebase from "firebase/app";
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "firebase/auth";

function Register({show, handleClose}) {

    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
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

    const confirmPassword = (e) => {
        setUser({
            ...user,
            confirmPassword: e.target.value
        });

        const confirmPas = e.currentTarget;

        if(e.target.value !== user.password) {
            setValidated(true);
            confirmPas.setCustomValidity('password must matches');
        } else {
            confirmPas.setCustomValidity('');
        }
    }

    

    const onRegister = (e) =>{
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;
        const password = document.querySelector('#formBasicPassword');
        if(user.password !== user.confirmPassword){
            password.setCustomValidity('password must matches');
        } else {
            password.setCustomValidity('');
        }
        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }
        
        
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((user) => {
            console.log(user);
            handleClose();
            setValidated(false);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(true);
            setErrorMessage(errorMessage)  
        });

    }

  
    return (
      <>
        <Modal show={show}  onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
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
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control required onChange={confirmPassword} type="password" placeholder="Confirm password" />
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
                </Form>
            </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default Register;