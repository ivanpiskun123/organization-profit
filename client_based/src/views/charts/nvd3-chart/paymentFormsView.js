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

const PaymentFormsView = () => {

    const [accordionKey, setAccordionKey] = useState(1);
    const [dataChart,setDataChart] = useState([])
    const [dataTable,setDataTable] = useState([])

    const colors = ['#04a9f5', '#3ebfea']
    const {currentYear} = useContext(AuthContext);

    const fetchData = async  ()=>{
        try{
            const response = await PagesService.getPaymentForms(currentYear)
            const chartData = response.data.data.payment_forms.map((a,i) => {return {key: a[0], y: a[1], color: colors[i] }}  )
            setDataChart(chartData);
            setDataTable(response.data.data.payment_forms)
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
                                    Формы оплаты
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 1}>
                            <div id="accordion1">
                                <Card.Body>
                                    <Card.Text>
                                        Формы оплаты - электронный перевод и рассчет наличными. Электронный перевод возможен
                                        в различных формах перевода как по интернет потокам, так и со счета на счет (банковский
                                        перевод).
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Продажи по формам оплаты</Card.Title>
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
                В таблице представлено <code>кол-во сделок</code> на форму оплаты
              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>Форма оплаты</th>
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

export default PaymentFormsView;
