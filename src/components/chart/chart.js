import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js'; 
import {Container, Row} from 'react-bootstrap';

const MyChart = ({operations, groupe}) => {
    const [ctx, setCtx] = useState(null);


    useEffect(()=>{
        const ctx = document.getElementById('myChart').getContext('2d');
        setCtx(ctx);
    }, [setCtx]);

    const operationsSortByDate = operations.sort((a, b)=>a.date - b.date);
    const labels = [...new Set(operationsSortByDate.map(item=>(item.date).toLocaleDateString('uk', {month: 'long', year: 'numeric'})))];

    // фомуємо масив витратних і дохідних груп
    const groupePluse = groupe.filter(item=>item.type === 'pluse');
    const groupeMinus = groupe.filter(item=>item.type === 'minus');

    // масив всіх дохідних/витратних операцій 
    // item.groupe(група здійсненої операції) проганяємо її через масив дохідних/витратних груп
    const groupOperByType = arrGroupType => {
        return operationsSortByDate.filter(item=>(arrGroupType.filter(itemGr=>itemGr.name === item.groupe).length > 0))
    }
    
    // визначаємо в якому місяці(Лейблі) була здійснена операція, формуємо об'єкт де ключ - індекс лейбла,
    // а значення масив сум операцій в цьому місяці

    const setObjData = (arrGroupType) => {
        let obj = {}
        groupOperByType(arrGroupType).forEach((item) => {
         labels.forEach((itemLabel, i)=>{
            if (itemLabel === item.date.toLocaleDateString('uk', {month: 'long', year: 'numeric'})) {
                if (obj[i]) {
                    obj[i] = [...obj[i], item.sum]
                } else {
                    obj[i] = [item.sum] 
                }
            }
            })
     })

     return obj;
    }
 
    // формуємо масив для графіка

    const setArrData = (obj) =>{
        let data = [];
     for(let i=0; i<labels.length; i++) {
        if(obj[i]) {
            const total = obj[i].reduce((a, b)=>a+b)
            data = [...data, total]
        } else {
            data = [...data, 0]
        }
     }

     return data;
    }

    if(ctx){
         new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Доходи',
                    data:setArrData(setObjData(groupePluse)),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Видатки',
                    data: setArrData(setObjData(groupeMinus)),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    
    return (
        <Container>
            <Row>
            <div className="col-lg-6  offset-lg-3 col-sm-8  offset-sm-2 mt-5">
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
            </Row>
        </Container>
        
    )
}

const mapStateToProps = ({operations, groupe})=>{
    return {
        operations,
        groupe
    }
}

export default connect(mapStateToProps)(MyChart);