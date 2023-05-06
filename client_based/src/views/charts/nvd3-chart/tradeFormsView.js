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

const SeasonView = () => {

    const [accordionKey, setAccordionKey] = useState(1);
    const [dataChart,setDataChart] = useState([])
    const [dataTable,setDataTable] = useState([])

    const colors = ['#ff8a65', '#f4c22b', '#04a9f5', '#3ebfea']
    const {currentYear} = useContext(AuthContext);

    const fetchData = async  ()=>{
        try{
            const response = await PagesService.getTradeForms(currentYear)
            const chartData = response.data.data.trade_forms.map((a,i) => {return {key: a[0], y: a[1], color: colors[i] }}  )
            setDataChart(chartData);
            setDataTable(response.data.data.trade_forms)
        }
        catch(e){
            console.log(e) }
    }

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        fetchData()
    },[currentYear])

    return (
        <React.Fragment>
            <Row>

                <Col sm={12} className="accordion">
                    <Card className="mt-2">
                        <Card.Header>
                            <Card.Title as="h5">
                                <Link
                                    to="#"
                                    onClick={() => setAccordionKey(accordionKey !== 1 ? 1 : 0)}
                                    aria-controls="accordion1"
                                    aria-expanded={accordionKey === 1}
                                >
                                    Формы торговли
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 1}>
                            <div id="accordion1">
                                <Card.Body>
                                    <Card.Text>
                                        Оптом и в розницу - главное отличие оптовой торговли от розничной
                                        заключается в том, каким образом товары,
                                        приобретенные у поставщика, используются покупателем.
                                        При опте предполагается их дальнейшее задействование в
                                        бизнесе (например, осуществление их последующей перепродажи).
                                        При рознице купленный товар используется лично его приобретателем,
                                        членами его семьи и иными лицами, которым он может передать товар.
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Продажи по формам торговли</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <PieDonutChart data={dataChart}/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card >
                        <Card.Header>
                            <Card.Title as="h5">Объемы и значения</Card.Title>
                            <span className="d-block m-t-5">
                В таблице представлено <code>кол-во сделок</code> на форму торговли
              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>Форма торговли</th>
                                    <th>Кол-во сделок</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dataTable.map((x) => {
                                        return (
                                            <tr>
                                                <td>{x[0]}</td>
                                                <td>{x[1]}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default SeasonView;
