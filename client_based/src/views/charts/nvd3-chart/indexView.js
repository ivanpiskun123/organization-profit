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

const IndexView = () => {

  const [accordionKey, setAccordionKey] = useState(1);
  const [dataChart,setDataChart] = useState([])
  const [dataTable,setDataTable] = useState([])
  const {currentYear} = useContext(AuthContext);

  const fetchData = async  ()=>{
    try{
      const response = await PagesService.getPlanSalesPurch(currentYear)
      let execData =  response.data.data.exec.map(a => {return {x: a[0], y: a[1]}}  )
      let indexData =  response.data.data.index.map(a => {return {x: a[0], y: a[1]}}  )
      let profitData =  response.data.data.profit.map(a => {return {x: a[0], y: a[1]}}  )

      const chartData = [
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

      setDataChart(chartData);
      setDataTable(response.data.data.table)
      console.log(response.data)
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
                    Продажи-Расходы
                  </Link>
                </Card.Title>
              </Card.Header>
              <Collapse in={accordionKey === 1}>
                <div id="accordion1">
                  <Card.Body>
                    <Card.Text>
                      Данные ниже отражают годовую динамику изменения сумм продаж продуктов и расходов на исходные ресурсы,
                      а также помесячный GGR.
                    </Card.Text>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          </Col>

          <Col sm={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Динамика Продаж-Расходов-GGR</Card.Title>
              </Card.Header>
              <Card.Body>
                <MultiBarChart data={dataChart}/>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12}>
            <Card >
              <Card.Header>
                <Card.Title as="h5">Объемы и значения</Card.Title>
                <span className="d-block m-t-5">
                строки выделенные <code>красным</code> соответствуют месяцам с <code>убылью</code>
              </span>
              </Card.Header>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>№</th>
                    <th>Месяц</th>
                    <th>Продажи</th>
                    <th>Расходы</th>
                    <th>GGR (прибыль)</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    dataTable.map((x) => {
                      return (
                          <tr  style={{ color: "black", backgroundColor: x[4]<0 && "#FF8694" } }   >
                            <th scope="row">{x[0]}</th>
                            <td>{x[1]}</td>
                            <td>{x[2]}</td>
                            <td>{x[3]}</td>
                            <td>{x[4]}</td>
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

export default IndexView;
