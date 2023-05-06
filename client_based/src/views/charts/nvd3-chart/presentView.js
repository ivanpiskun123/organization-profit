import React, {useState,useEffect, useContext} from 'react';
import {Row, Col, Card, Collapse, Table} from 'react-bootstrap';

import LineChart from './chart/LineChart';
import BarDiscreteChart from './chart/BarDiscreteChart';
import PieDonutChart from './chart/PieDonutChart';
import PieBasicChart from './chart/PieBasicChart';
import MultiBarChart from './chart/MultiBarChart';
import {Link} from "react-router-dom";
import PagesService from "../../../API/PagesService";
import {AuthContext} from "../../../contexts/AuthContext";

const PresentView = () => {

    const [accordionKey, setAccordionKey] = useState(1);
    const [dataChart,setDataChart] = useState([])
    const [dataChartSeason,setDataChartSeason] = useState([])
    const [dataChartForm,setDataChartForm] = useState([])
    const {currentYear} = useContext(AuthContext);
    const [totals, setTotals] = useState([0,0,0,0])

    const colors = ['#ff8a65', '#f4c22b', '#04a9f5', '#3ebfea']

    const fetchData = async  ()=>{
        try{
            const response = await PagesService.getPlanSalesPurch(currentYear)
            let planData =  response.data.data.plan.map(a => {return {x: a[0], y: a[1]}}  )
            let execData =  response.data.data.exec.map(a => {return {x: a[0], y: a[1]}}  )
            let indexData =  response.data.data.index.map(a => {return {x: a[0], y: a[1]}}  )
            let profitData =  response.data.data.profit.map(a => {return {x: a[0], y: a[1]}}  )

            const chartData = [
                {
                    values: planData,
                    key: 'План продаж',
                    color: '#A389D4'
                },
                {
                    values: execData,
                    key: 'Выполнено продаж',
                    color: '#1de9b6',
                    area: true
                },
                {
                    values: indexData,
                    key: 'Расходы',
                    color: '#04a9f5'
                },
                {
                    values: profitData,
                    key: 'GGR (прибыль)',
                    color: '#00C12B'
                }
            ];

            setTotals([
                response.data.data.plan.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem[1];
                }, 0),
                response.data.data.exec.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem[1];
                }, 0),
                response.data.data.index.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem[1];
                }, 0),
                response.data.data.profit.reduce((accumulator, currentItem) => {
                    return accumulator + currentItem[1];
                }, 0)
            ])


            setDataChart(chartData);

            const response1 = await PagesService.getSeasons(currentYear)
            const chartData1 = response1.data.data.seasons.map((a,i) => {return {key: a[0], y: a[1], color: colors[i] }}  )
            setDataChartSeason(chartData1);


            const response2 = await PagesService.getTradeForms(currentYear)
            const chartData2 = response2.data.data.trade_forms.map((a,i) => {return {key: a[0], y: a[1], color: colors[i] }}  )
            setDataChartForm(chartData2);


        }
        catch(e){
            console.log(e) }
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        console.log(currentYear)
        fetchData()
    },[currentYear])

    return (
        <React.Fragment>
            <Row>

                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">План-Продажи-Расходы</Card.Title>
                                <span className="d-block m-t-5">
                                   Годовые показатели <br></br>
                                <code>План</code>={totals[0]} | <code>Продажи</code>={totals[1]} | <code>Расходы</code>={totals[2]} | <code>GGR (прибыль)</code>={totals[3]}
                              </span>
                        </Card.Header>
                        <Card.Body>
                            <MultiBarChart data={dataChart}/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Сезонность продаж</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <PieBasicChart  data={dataChartSeason}/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Продажи по формам торговли</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <PieDonutChart data={dataChartForm}/>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default PresentView;
