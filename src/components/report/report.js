import React from 'react';
import {connect} from 'react-redux';
import { Container, ProgressBar } from 'react-bootstrap';

import './report.css';

const Report = ({operations}) => {
    return (
        <Container>
            <h1 className="text-center mt-5">Звіт за півроку</h1>
            <div className="descr__list-item">
                <div className="d-flex justify-content-between">
                    <div className="descr__list-title">Надходження</div>
                    <div className="descr__list-sum">60</div>
                </div>
                <ProgressBar now={60} label={`${60}%`} />
            </div>
            <div className="descr__list-item">
                <div className="d-flex justify-content-between">
                    <div className="descr__list-title">Видатки</div>
                    <div className="descr__list-sum">20</div>
                </div>
                <ProgressBar now={20} label={`${20}%`} />
            </div>
        </Container>
    )
}

const mapStateToProps = ({operations})=>{
    return {
        operations
    }
}

export default connect(mapStateToProps)(Report);