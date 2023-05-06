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

const GroupsView = () => {

    const [accordionKey, setAccordionKey] = useState(1);
    const [dataChart,setDataChart] = useState([])
    const [dataTable,setDataTable] = useState([])

    const {currentYear} = useContext(AuthContext);
    const colors = ['#3ebfea', '#04a9f5', '#ff8a65' , '#1de9b6', '#4C5667', '#69CEC6', '#a389d4', '#FE8A7D' ]

    const fetchData = async  ()=>{
        try{
            const response = await PagesService.getGroups(currentYear)

            const groups =  response.data.data.groups.map((a,i) => {
                return {
                    label: a[0], value: a[1], color: colors[i]
                }
            }  )

            const chartData  = [
                {
                    key: 'Cumulative Return',
                    values: groups
                }
            ]

            setDataChart(chartData);
            setDataTable(response.data.data.groups)
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
                                    Продажи ресурсов
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 1}>
                            <div id="accordion1">
                                <Card.Body>
                                    <Card.Text>
                                       Группы продуктов - аггрегирующие наименования для определенных
                                        продектов, поступающих в продажу от компании в компании IT-Стат.
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                </Col>

                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Продажи по группам продуктов</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BarDiscreteChart data={dataChart}/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title as="h5">Объемы и значения</Card.Title>
                            <span className="d-block m-t-5">
                Продажи по продуктам аггрегированы по продажам групп продуктов в таблице.
              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>Группа продуктов</th>
                                    <th>Сумма продаж по группе продуктов</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dataTable.map((x) => {
                                        return (
                                            <tr >
                                                <th scope="row">{x[0]}</th>
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

export default GroupsView;
