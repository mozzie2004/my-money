import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Container} from 'react-bootstrap';
import Count from '../count/count';
import AddCount from '../add-count/add-count';
import Spinner from '../spinner/spinner';


import './counts.css'

const Counts = ({counts, curentUser, loadingCounts}) => {
const [show, setShow] = useState(false);

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
    if (!loadingCounts && counts) {
        count = (
            counts.map(item=>{
                const {title, sum, id} = item;
                return(
                    <Count key={id} title={title} sum={sum}/>
                )
            })
        )
    } else {
        count = <Spinner/>;
    }
    
    const listTitle = curentUser ? 'Мої рахунки' : 'Мої рахунки (Для прикладу)'

    return (
        <Container>
            <AddCount show={show} handleClose={handleClose}/>
            <div className="d-flex justify-content-end mt-2">
                <Button onClick={handleShow} variant="primary">Добавити рахунок</Button>
            </div>
            <h1 className="text-center">{listTitle}</h1>
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

const mapStateToProps = ({counts, curentUser, loading}) => {
    return {
        counts,
        curentUser,
        loadingCounts: loading.loadingCounts
    }
}

export default connect(mapStateToProps)(Counts);