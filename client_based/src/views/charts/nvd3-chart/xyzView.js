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

const  XyzView = () => {

    const [accordionKey, setAccordionKey] = useState(1);
    const [dataChart,setDataChart] = useState([])
    const [dataTable,setDataTable] = useState([])
    const {currentYear} = useContext(AuthContext);
    const [dataGroups, setDataGroups] = useState([])
    const [dataProd, setDataProd] = useState([])
    const [dataConsum, setDataConsum] = useState([])


    const fetchData = async  ()=>{
        try{
            const response = await PagesService.getXyz(currentYear)
            setDataGroups(response.data.data.xyz_group)
            setDataProd(response.data.data.xyz_prod)
            setDataConsum(response.data.data.xyz_consum)
            console.log(response.data.data)
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
                                    XYZ-анализ
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 1}>
                            <div id="accordion1">
                                <Card.Body>
                                    <Card.Text>
                                        Расширенный-пользовательский XYZ-анализ помогает рассчитать,
                                        сколько объектов должно быть в ресурсе (хранилище),
                                        чтобы они не залёживались и приносили прибыль. Для этого анализа
                                        требуется статистика по продажам за несколько месяцев,
                                        чтобы понять, насколько устойчив спрос на объект в разные периоды.
                                        XYZ-анализ выделяет объекты со стабильным спросом.
                                        Для этого рассчитывается, как меняется объём продаж от месяца к месяцу.
                                        <br></br>По каждой товарной группе определяется коэффициент вариации,
                                        который показывает колебание спроса за отдельно взятый период:
                                        <p></p>
                                        Х — ресурсы со стабильным спросом. Колебание от <b>0−100%</b>
                                        <br></br>
                                        Y — средние, например, сезонные объекты. Колебание <b>100-200%</b>
                                        <br></br>
                                        Z — ресурсы с нестабильным спросом. Колебание от <b>200%</b>
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                </Col>


                <Col sm={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title as="h5">XYZ-анализ групп продуктов продаж</Card.Title>
                              <span className="d-block m-t-5">
                                <code>X-группа</code>=0−100% | <code>Y-группа</code>=100−200% | <code>Z-группа</code>= >200% | <br></br>
                                Cтроки выделенные <code>красным</code> соответствуют группам продуктов продаж нестабильной <code>Z</code> группы
                              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Группа продуктов</th>
                                    <th>Группа вариативности</th>
                                    <th>Коэффициент вариации</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dataGroups.map((x,i) => {
                                        return (
                                            <tr   style={{ color: "black", backgroundColor: x[1]=='Z' && "#FF8694" } } >
                                            <th scope="row">{i}</th>
                                                <td>{x[0]}</td>
                                                <td>{x[1]}</td>
                                                <td>{parseFloat(x[2]).toFixed(3) }</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title as="h5">XYZ-анализ продуктов продажи</Card.Title>
                            <span className="d-block m-t-5">
                                <code>X-группа</code>=0−100% | <code>Y-группа</code>=100−200% | <code>Z-группа</code>= >200% | <br></br>
                                Cтроки выделенные <code>красным</code> соответствуют продуктам продажи нестабильной <code>Z</code> группы
                              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Продукт</th>
                                    <th>Группа вариативности</th>
                                    <th>Коэффициент вариации</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dataProd.map((x,i) => {
                                        return (
                                             <tr   style={{ color: "black", backgroundColor: x[1]=='Z' && "#FF8694" } } >
                                                <th scope="row">{i}</th>
                                                <td>{x[0]}</td>
                                                <td>{x[1]}</td>
                                                <td>{parseFloat(x[2]).toFixed(3) }</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>



                <Col sm={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title as="h5">XYZ-анализ расходных ресурсов</Card.Title>
                            <span className="d-block m-t-5">
                                <code>X-группа</code>=0−100% | <code>Y-группа</code>=100−200% | <code>Z-группа</code>= >200% | <br></br>
                                Cтроки выделенные <code>красным</code> соответствуют расходным ресурсам нестабильной <code>Z</code> группы
                              </span>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Ресурс</th>
                                    <th>Группа вариативности</th>
                                    <th>Коэффициент вариации</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dataConsum.map((x,i) => {
                                        return (
                                            <tr   style={{ color: "black", backgroundColor: x[1]=='Z' && "#FF8694" } } >
                                                <th scope="row">{i}</th>
                                                <td>{x[0]}</td>
                                                <td>{x[1]}</td>
                                                <td>{parseFloat(x[2]).toFixed(3) }</td>
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

export default XyzView;
