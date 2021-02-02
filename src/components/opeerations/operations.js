import React, { useState } from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import { Container, ListGroup } from 'react-bootstrap';
import sortService from '../../services/sortService';
import OperationsItem from '../operations-item/operations-item';
import AddOperations from '../add-operations/add-operations';


const Operations = ({operations, curentUser}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let operationsByDate = [];
    if(operations && operations.length>0) {
        operationsByDate = (new sortService()).groupedByDate(operations);
    }
    
    let titles = [];
    let data = [];

    for(let key in operationsByDate) {
        titles = [...titles, key];
        data = [...data, operationsByDate[key]]
    }
    let operationsList = [];
    if(titles.length > 0) {
        operationsList = titles.map((item, i)=>{
    
            return (
                <div className="mt-5" key={item}>
                    <div className="d-flex justify-content-between">
                        <h5 className="text-center">{item}</h5>
                    </div>
                    <ListGroup>
                        <OperationsItem data={data[i]}/>
                    </ListGroup>
                </div>
            )
        })
    }
    return (
        <Container>
            <AddOperations show={show} handleClose={handleClose} handleShow={handleShow}/>
            <div className="d-flex justify-content-end mt-2">
                <Button onClick={handleShow} variant="primary">Добавити операцію</Button>
            </div>
            {operationsList}
            
        </Container>
        
    )
}

const mapStateToProps = ({operations, curentUser}) =>{
    return {
        operations,
        curentUser
    }
}

export default connect(mapStateToProps)(Operations);