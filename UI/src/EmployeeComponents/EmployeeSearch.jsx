import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

{
  /*This component, helps user to search Employee data based on employee type (All, Full Time, Part Time, Seasonal and Contract*/
}
export default class EmployeeSearch extends React.Component {
  render() {
    return (
      <aside id="sidebar" className="sidebar">
        <Nav className="flex-column sidebar-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/manage">
            <i className="fa fa-users"></i> All Employees
            </Nav.Link>
          </Nav.Item>
          <li className="nav-heading">{' Filter by employee type: '}</li>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={{ pathname: "/manage", search: "?employeeType=Full_Time" }}
            >
              Full Time
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={{ pathname: "/manage", search: "?employeeType=Part_Time" }}
            >
              Part Time
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={{ pathname: "/manage", search: "?employeeType=Contract" }}
            >
              Contract
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={{ pathname: "/manage", search: "?employeeType=Seasonal" }}
            >
              Seasonal
            </Nav.Link>
          </Nav.Item>

          <li className="nav-heading">{' Filter Upcoming Retirements '}</li>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={{ pathname: "/manage", search: "?upcomingRetirement=true" }}
            >
              <i className="fa fa-asterisk"></i> Upcoming Retirement
            </Nav.Link>
          </Nav.Item>

        </Nav>
      </aside>
    );
  }
}
