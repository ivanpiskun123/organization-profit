import React, { useContext } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {AuthContext} from "../../../../contexts/AuthContext";
import useWindowSize from '../../../../hooks/useWindowSize';
import { ConfigContext } from '../../../../contexts/ConfigContext';


const NavLeft = () => {
  const windowSize = useWindowSize();

  const configContext = useContext(ConfigContext);
  const { rtlLayout } = configContext.state;
  let dropdownRightAlign = false;
  if (rtlLayout) {
    dropdownRightAlign = true;
  }

  let navItemClass = ['nav-item'];
  if (windowSize.width <= 575) {
    navItemClass = [...navItemClass, 'd-none'];
  }

  const {currentYear, setCurrentYear, years} = useContext(AuthContext);

  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
        <ListGroup.Item as="li" bsPrefix=" " className={navItemClass.join(' ')}>
          <Dropdown alignRight={dropdownRightAlign}>
            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
              {currentYear}
            </Dropdown.Toggle>
            <ul>


              <Dropdown.Menu>
                {
                  years.map((e)=>(
                    <li key={e}>
                      <Link to="#" className="dropdown-item" onClick={()=>(setCurrentYear(e))}>
                        {e} год
                      </Link>
                    </li>
                  ))
                }
              </Dropdown.Menu>
            </ul>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as="li" bsPrefix=" " className="nav-item">

        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavLeft;
