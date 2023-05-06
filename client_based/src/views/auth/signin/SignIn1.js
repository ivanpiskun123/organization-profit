import React,  {useState, useEffect, useContext}  from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import {AuthContext} from '../../../contexts/AuthContext'
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import AuthService from '../../../API/AuthService'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import FirebaseLogin from './FirebaseLogin';

const Signin1 = () => {

  const {isAuth, setIsAuth} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const authFetchUser = async () => {
      try {
        const response = await AuthService.athenticate(email, password);
        console.log(response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user_id',response.data.user_id)
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
      } catch (e) {
        console.log("Wrong email or password")
      }
    }

    authFetchUser()
  }

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <FirebaseLogin handleSubmit={handleSubmit}
                             email={email}
                             setEmail={setEmail}
                             password={password}
                             setPassword={setPassword}
              />
              <Alert variant="primary" className="text-left mt-3">
                Demo mail:
                <CopyToClipboard text="admin1@gmail.com">
                  <Button variant="outline-primary" as={Link} to="#" className="badge mx-2 mb-2" size="sm">
                    {' '}
                    <i className="fa fa-user mr-1" /> admin1@gmail.com{' '}
                  </Button>
                </CopyToClipboard>
                <br />
                Password- :
                <CopyToClipboard text="admin123">
                  <Button variant="outline-primary" as={Link} to="#" className="badge mx-2" size="sm">
                    {' '}
                    <i className="fa fa-lock mr-1" /> admin123{' '}
                  </Button>
                </CopyToClipboard>
              </Alert>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
