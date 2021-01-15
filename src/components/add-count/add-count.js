import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {addNewCount} from '../../actions';

const AddCount = ({show, counts, handleClose, addNewCount, curentUser}) => {
    const [newCount, setNewCount] = useState({});
    const [validated, setValidated] = useState(false);

    const onAddNewTitle = (e) =>{
        setNewCount({
            ...newCount,
            title: e.target.value
        })
    }

    const onAddNewSum = (e) =>{
        setNewCount({
            ...newCount,
            sum: e.target.value
        })
    }

    const db = firebase.firestore();

    const onAddCount = (e) => {
        e.preventDefault();
        setValidated(true);
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }

        if(curentUser) {
            db.collection(`${curentUser.uid}Counts`).add({
                title: newCount.title,
                sum: newCount.sum,
            })
            .then(function(docRef) {
                addNewCount({title: newCount.title, sum: newCount.sum, id: docRef.id});
                setValidated(false);
                handleClose();
            })
            .catch(function(error) {
                console.error("Error adding count: ", error);
        });
        } else {
            const id = Math.max(...counts.map(item => item.id)); 
            addNewCount({title: newCount.title, sum: newCount.sum, id: id+1});
        }

    }

    return (
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавити рахунок</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={onAddCount} >
                    <Form.Group>
                        <Form.Label>Назва рахунку</Form.Label>
                        <Form.Control onChange={onAddNewTitle} required type="text" placeholder="Новий рахунок" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Початковий баланс</Form.Label>
                        <Form.Control onChange={onAddNewSum} pattern="[0-9]{1,}"  required  type="text" placeholder="0" />
                        <Form.Control.Feedback type="invalid">
                           тільки цифри
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Добавити
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        
      );
}

const mapStateToProps = ({counts, curentUser})=> {
    return {
        counts,
        curentUser
    }
}

const mapDispatchToProps = {
    addNewCount
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCount);