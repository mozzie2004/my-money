import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Modal, Form, Button} from 'react-bootstrap';
import {addNewOperations, addNewCountOperation, groupesLoaded, countsLoaded} from '../../actions';
import firebaseService from '../../services/fierbaseService';
import AddGroupe from '../add-groupe/add-groupe';
import AddCount from '../add-count/add-count';

const AddOperations = ({show, handleClose, handleShow, groupe, counts, addNewOperations, operations, addNewCountOperation, curentUser, groupesLoaded, countsLoaded}) => {
    useEffect(()=>{
        if (curentUser){
            const firebase = new firebaseService();
            firebase.getData(`${curentUser.uid}Groupe`, groupesLoaded);
            firebase.getData(`${curentUser.uid}Counts`, countsLoaded)
        } 
    }, [curentUser, groupesLoaded, countsLoaded]);


    const [validated, setValidated] = useState(false);
    const [showGroupe, setShowGroupe] = useState(false);
    const [showCount, setShowCount] = useState(false);
    const curentDate = new Date().toLocaleDateString('uk', {month: 'numeric', day: 'numeric', year: 'numeric'});
    const value = curentDate.split('.').reverse().join('-');

    const handleCloseGroupe = () => {
        setShowGroupe(false);
        handleShow();
    }

    const handleShowGroupe = () => {
        handleClose();
        setShowGroupe(true);
    }

    const handleCloseCount = () => {
        setShowCount(false);
        handleShow();
    }

    const handleShowCount = () => {
        handleClose();
        setShowCount(true);
    }
    

    const onSubmit = (e)=> {
        e.preventDefault();
        setValidated(true);
        
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }

        const formData = new FormData(form);
        const date = formData.get('date');
        const groupeName = formData.get('groupe');
        const groupeType = groupe.find(item=>item.name === formData.get('groupe')).type;
        const countId = counts.find(item=>item.title === formData.get('count')).id;
        const curentCount = counts.find(item=>item.id === countId);
        const sumOperations = groupeType === 'earnings' ? +formData.get('sum') : -+formData.get('sum');
        const sum = curentCount.sum + sumOperations;
        const firebase = new firebaseService();
        firebase.setData(curentUser, 'Operations', {date, groupe: groupeName, groupeType, sum: sumOperations, countId}, addNewOperations, setValidated, handleClose, operations);
        firebase.updateField(curentUser, 'Counts', countId, 'sum', sum, addNewCountOperation)
    }
    return (
        <>
        <AddGroupe show={showGroupe} handleClose={handleCloseGroupe}/>
        <AddCount show={showCount} handleClose={handleCloseCount}/>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Добавити операцію</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={onSubmit} >
                <Form.Group>
                    <Form.Label>Дата</Form.Label>
                    <Form.Control name="date"  required type="date" defaultValue={value} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Група</Form.Label>
                    <div className="d-flex">
                        <Form.Control required name="groupe" as="select">
                            {
                                groupe.map(item=>{
                                    return (
                                        <option key={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
                        <Button onClick={handleShowGroupe} variant="primary">+</Button>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>провести з рахунку</Form.Label>
                    <div className="d-flex">
                        <Form.Control name="count" as="select">
                            {
                                counts.map(item=>{
                                    return (
                                        <option key={item.id}>{item.title}</option>
                                    )
                                })
                            }
                        </Form.Control>
                        <Button onClick={handleShowCount} variant="primary">+</Button>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Сума</Form.Label>
                    <Form.Control pattern="[0-9]{1,}" name="sum"  required type="text"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Добавити
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    </>
    )
}

const mapStateToProps = ({groupe, counts, operations, curentUser}) =>{
    return {
        groupe,
        counts,
        operations,
        curentUser
    }
}

export default connect(mapStateToProps, {addNewOperations, addNewCountOperation, groupesLoaded, countsLoaded})(AddOperations);