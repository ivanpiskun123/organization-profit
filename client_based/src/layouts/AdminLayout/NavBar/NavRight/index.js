import React, { useContext, useState } from 'react';
import { ListGroup, Dropdown, Media } from 'react-bootstrap';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ChatList from './ChatList';
import { ConfigContext } from '../../../../contexts/ConfigContext';
import useAuth from '../../../../hooks/useAuth';
import {AuthContext} from "../../../../contexts/AuthContext"


import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../../assets/images/user/avatar-3.jpg';
import avatar4 from '../../../../assets/images/user/avatar-4.jpg';

const NavRight = () => {
  const {logOut} = useContext(AuthContext);

  const configContext = useContext(ConfigContext);
  const { rtlLayout } = configContext.state;

  const [listOpen, setListOpen] = useState(false);


  return (
      <Router>
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
        <ListGroup.Item as="li" bsPrefix=" ">

        </ListGroup.Item>

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown alignRight={!rtlLayout} className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>Настройки</span>
                <Link to="#" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" onClick={logOut} />
                </Link>
              </div>
              <ListGroup   variant="flush" className="pro-body">
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to={{ pathname: "http://localhost:3000/admin" }} className="dropdown-item" target="_blank">
                    <i className="feather icon-settings" /> Работа с данными
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item" onClick={logOut}>
                    <i className="feather icon-log-out" /> Выйти
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment></Router>

  );
};

export default NavRight;
