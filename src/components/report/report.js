import React from 'react';
import {connect} from 'react-redux';
import { Container, ProgressBar } from 'react-bootstrap';
import sortService from '../../services/sortService';
import MyChart from '../chart/chart';


import './report.css';

const Report = ({operations, groupe}) => {

    new sortService().groupedByMonth(operations);
        
    const operationsSortByDate = operations.sort((a, b)=>a.date - b.date);
    const labels = [...new Set(operationsSortByDate.map(item=>(new Date(item.date)).toLocaleDateString('uk', {month: 'long', year: 'numeric'})))];
    // фомуємо масив витратних і дохідних груп
    const groupePluse = groupe.filter(item=>item.type === 'earnings');
    const groupeMinus = groupe.filter(item=>item.type === 'expenses');

    // масив всіх дохідних/витратних операцій 
    // item.groupe(група здійсненої операції) проганяємо її через масив дохідних/витратних груп
    const groupOperByType = arrGroupType => {
        return operationsSortByDate.filter(item=>(arrGroupType.filter(itemGr=>itemGr.name === item.groupe).length > 0))
    }
    const earnings = operations.length > 0 && groupOperByType(groupePluse).length > 0 ? groupOperByType(groupePluse).map(item=>item.sum).reduce((a, b)=> a+ b) : 0;
    const expenses = operations.length > 0 && groupOperByType(groupeMinus).length > 0 ? groupOperByType(groupeMinus).map(item=>item.sum).reduce((a, b)=> a+ b, 0) : 0;
    const totalOperations = earnings + -expenses;
    const fractionsEarnings = totalOperations !== 0 ? Math.floor(earnings/totalOperations*100) : 0;
    const fractionsExpenses = totalOperations !== 0 ? 100-fractionsEarnings : 0;
    
    
    // визначаємо в якому місяці(Лейблі) була здійснена операція, формуємо об'єкт де ключ - індекс лейбла,
    // а значення масив сум операцій в цьому місяці

    const setObjData = (arrGroupType) => {
        let obj = {}
        groupOperByType(arrGroupType).forEach((item) => {
         labels.forEach((itemLabel, i)=>{
            if (itemLabel === new Date(item.date).toLocaleDateString('uk', {month: 'long', year: 'numeric'})) {
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

    const chartConfig = {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Доходи',
                data: setArrData(setObjData(groupePluse)),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Видатки',
                data: setArrData(setObjData(groupeMinus)).map(item=>-item),
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
    }
    let render = null;
    if(operations.length>0) {
        render = (
            <Container>
            <h1 className="text-center mt-5">Звіт за півроку</h1>
            <div className="descr__list-item">
                <div className="d-flex justify-content-between">
                    <div className="descr__list-title">Надходження</div>
                    <div className="descr__list-sum">{earnings}</div>
                </div>
                <ProgressBar now={fractionsEarnings} label={`${fractionsEarnings}%`} />
            </div>
            <div className="descr__list-item">
                <div className="d-flex justify-content-between">
                    <div className="descr__list-title">Видатки</div>
                    <div className="descr__list-sum">{expenses}</div>
                </div>
                <ProgressBar now={fractionsExpenses} label={`${fractionsExpenses}%`} />
            </div>
            <MyChart chartConfig={chartConfig}/>
        </Container>
        )
    }
    
    return render
    
}

const mapStateToProps = ({operations, groupe})=>{
    return {
        operations,
        groupe
    }
}

export default connect(mapStateToProps)(Report);