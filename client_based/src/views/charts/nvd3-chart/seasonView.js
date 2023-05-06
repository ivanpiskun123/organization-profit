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
            const response = await PagesService.getSeasons(currentYear)
            const chartData = response.data.data.seasons.map((a,i) => {return {key: a[0], y: a[1], color: colors[i] }}  )
            setDataChart(chartData);
            setDataTable(response.data.data.seasons)
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
                                    Сезонность продаж
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 1}>
                            <div id="accordion1">
                                <Card.Body>
                                    <Card.Text>
                                        Сезонность спроса — это изменение продаж/спроса на продаваемые продукты
                                        под воздействием внешних факторов, связанных с датами/сезонами: время года,
                                        праздники и так далее. Она прогнозирует периоды роста
                                        и падения интереса клиентов к разным услугам/продуктам, рассчитывает
                                        примерный уровень доходов и расходов.
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Сезонность продаж</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <PieBasicChart  data={dataChart}/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={6}>
                    <Card >
                        <Card.Header>
                            <Card.Title as="h5">Объемы и значения</Card.Title>
                            <span className="d-block m-t-5">
                <code>1 квартал</code> - январь, февраль, март |
                <code>2 квартал</code> - апрель, май, июнь |
                <code>3 квартал</code> - июль, август, сентябрьт |
                <code>4 квартал</code> - октябрь, ноябрь, декабрь |
              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>Квартал</th>
                                    <th>Объем продаж</th>
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
