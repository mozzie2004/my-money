import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addNewGroupe} from '../../actions';
import firebaseService from '../../services/fierbaseService';

const AddGroupe = ({show, groupe, handleClose, addNewGroupe, curentUser}) => {
    const [validated, setValidated] = useState(false);

   


    const onAddGroupe = (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }

        const formData = new FormData(form);
        const name = formData.get('name');
        const type =  formData.get('type') === 'доходи' ? 'earnings' : 'expenses';

        const obj = {
            name,
            type
        }
        const firebase = new firebaseService();
        firebase.setData(curentUser, 'Groupe', obj, addNewGroupe, setValidated, handleClose, groupe);
    }

    return (
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавити групу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={onAddGroupe} >
                    <Form.Group>
                        <Form.Label>Назва групи</Form.Label>
                        <Form.Control name="name" required type="text" placeholder="Нова група" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Вид групи</Form.Label>
                        <Form.Control name="type" as="select">
                            <option>доходи</option>
                            <option>видатки</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Добавити
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        
      );
}

const mapStateToProps = ({curentUser, groupe})=> {
    return {
        groupe,
        curentUser
    }
}

const mapDispatchToProps = {
    addNewGroupe
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupe);