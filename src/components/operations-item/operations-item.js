import React from 'react';
import {ListGroup} from 'react-bootstrap';

const OperationsItem = ({data}) => {

    let variantLight = true;
    const earningsArr = data.filter(item=>item.groupeType === 'earnings').map(item=>item.sum);
    const expensesArr = data.filter(item=>item.groupeType === 'expenses').map(item=>item.sum);
    const earnings = earningsArr.length>0 ? earningsArr.reduce((a, b)=>a+b) : 0;
    const expenses = expensesArr.length>0 ? expensesArr.reduce((a, b)=>a+b) : 0;
    
    return (
        <>
            {data.map(elem=>{
                const variant = variantLight ? 'light' : '';
                variantLight = !variantLight;
                return (
                    <ListGroup.Item variant={variant} className="d-flex justify-content-between" key={elem.id}>
                        <div>{elem.groupe}</div>
                        <div>{elem.sum}</div>
                    </ListGroup.Item>
                )
            })}
            <ListGroup.Item variant="success" className="d-flex justify-content-between">
                <div>Всього</div>
                <div className="d-flex">
                    <div className="mr-2">Доходів {earnings}</div>
                    <div>Витрат {expenses}</div>
                </div>
            </ListGroup.Item>
        </>
    )
}

export default OperationsItem;