import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';

const FirebaseLogin = (props) => {



  return (
    <React.Fragment>

          <form noValidate onSubmit={props.handleSubmit}  >
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="admin1@gmail.com"
                name="email"
                type="email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              />

            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                name="password"
                placeholder = "admin123"
                type="password"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
              />

            </div>


            <Row>
              <Col mt={2}>
                <Button className="btn-block" color="primary"  size="large" type="submit" variant="primary">
                  Войти
                </Button>
              </Col>
            </Row>
          </form>




      <hr />
    </React.Fragment>
  );
};

export default FirebaseLogin;
