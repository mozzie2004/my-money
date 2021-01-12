import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Container} from 'react-bootstrap';
import Count from '../count/count';
import AddCount from '../add-count/add-count';
import {countsLoaded} from '../../actions';
import firebase from "firebase"; 

import './counts.css'

const Counts = ({counts, countsLoaded}) => {
const [show, setShow] = useState(false);

useEffect(()=>{
    let data = [];
    firebase.firestore().collection("counts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const newItem = {...doc.data(), id: doc.id}
            data = [...data, newItem]
        });
        countsLoaded(data);
    });
    
}, []);
    


const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


    const total = () => {
        if (counts.length !== 0) {
            return counts.map(item=>+item.sum).reduce((a, b)=>a+b)
        } else {
            return 0
        }
       
    }

    let count;
    if (counts.length !== 0) {
        count = (
            counts.map(item=>{
                const {title, sum, id} = item;
                return(
                    <Count key={id} title={title} sum={sum}/>
                )
            })
        )
    } else {
        count = '';
    }
    
    

    return (
        <Container>
            <AddCount show={show} handleClose={handleClose}/>
            <div className="d-flex justify-content-end mt-2">
                <Button onClick={handleShow} variant="primary">Добавити рахунок</Button>
            </div>
            <ul className="counts__list">
               {count}
            </ul>
            <div className="counts__item counts__total">
                <div>Баланс по всіх рахунках</div>
                <div>{total()}</div>
            </div>
        </Container> 
    )
}

const mapStateToProps = ({counts}) => {
    return {
        counts
    }
}

export default connect(mapStateToProps, {countsLoaded})(Counts);