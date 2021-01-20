import React, {useEffect, useState} from 'react';
import Chart from 'chart.js'; 
import {Container, Row} from 'react-bootstrap';

const MyChart = ({chartConfig}) => {
    const [ctx, setCtx] = useState(null);


    useEffect(()=>{
        const ctx = document.getElementById('myChart').getContext('2d');
        setCtx(ctx);
    }, [setCtx]);

    

    if(ctx){
         new Chart(ctx, chartConfig);
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



export default MyChart;