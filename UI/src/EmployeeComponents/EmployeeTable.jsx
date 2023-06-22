import React from "react";
import EmployeeRow from "./EmployeeRow.jsx";
import { Table } from 'react-bootstrap';

export default class EmployeeTable extends React.Component {
  render() {
    let counter = 1;
    const allEmployees = this.props.employees.map(
      employee => <EmployeeRow employee={employee} key={employee.id} count={counter++} />
    );

    return (
      <>
        {allEmployees.length > 0 ? (
          <>
            <h4 className="card-title">Employees List</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col"> S.N.</th>
                  <th scope="col"> FirstName</th>
                  <th scope="col"> LastName</th>
                  <th scope="col"> Age</th>
                  <th scope="col"> Date of Joining</th>
                  <th scope="col"> Title</th>
                  <th scope="col"> Department</th>
                  <th scope="col"> Employee Type</th>
                  <th scope="col"> Current Status</th>
                  <th scope="col"> Action</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees}
              </tbody>
            </Table>
            <p className="total">Total Employees : {allEmployees.length}</p>
          </>
        ) : (<h2 className="card-title"> No employees found !!</h2>)}
      </>
    );
  }
}
