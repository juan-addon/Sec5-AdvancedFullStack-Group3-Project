import React from "react";
import { withRouter } from "react-router-dom";
import fetchGraphQL from "../scripts/graphQLFetch.js";
import queries from "../scripts/query.js";
import { Button } from "react-bootstrap";

{
  /*Component to create delete Employee Record within EMS*/
}
class EmployeeDelete extends React.Component {
  constructor() {
    super();
    this.state = { errors: false };
    this.handleDeleteAction = this.handleDeleteAction.bind(this);
    this.handleCancelAction = this.handleCancelAction.bind(this);
  }

  async handleDeleteAction() {
    const { id } = this.props.match.params;
    const getQuery = queries.queryToFetchEmployeeById();
    const deleteQuery = queries.queryToDeleteEmployee();

    try {
      // Retrieve employee information
      const employeeData = await fetchGraphQL(getQuery, { employeeId: id });
      const employee = employeeData.employee;

      // Check if the employee's CurrentStatus is active
      if (employee.currentStatus) {
        this.setState({
          errors: true,
        });
      } else {
        // Delete employee
        const deleteData = await fetchGraphQL(deleteQuery, { employeeId: id });
        const result = deleteData.deleteEmployee;

        // Check if the employee was deleted successfully
        if (result) {
          // navigate to Manage page once the employee has been deleted
          this.props.history.push("/manage");
        } else {
          alert("Error deleting employee");
        }
      }
    } catch (e) {
      alert(`Error while sending data to GraphQL server: ${e.message}`);
    }
  }

  handleCancelAction() {
    {
      /*navigate to Manage page  */
    }
    this.props.history.push("/manage");
  }

  render() {
    return (
      <section className="section">
        <div className="card">
          <div className="card-body">
            {this.state.errors && (
              <div>
                <div className="alert alert-danger text-center" role="alert">
                  CAN'T DELETE EMPLOYEE – STATUS ACTIVE
                </div>
              </div>
            )}

            <div className="pagetitle">
              <h1 className="m-4 d-flex justify-content-center">
                Are you sure you want to delete employee?
              </h1>
            </div>

            <div className="d-flex justify-content-center">
              <Button
                variant="danger"
                onClick={this.handleDeleteAction}
                className="mx-2"
              >
                Yes
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleCancelAction}
                className="mx-2"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(EmployeeDelete);
