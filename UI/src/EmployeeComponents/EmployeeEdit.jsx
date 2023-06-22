import React from "react";
import { withRouter } from "react-router-dom";
import fetchGraphQL from "../scripts/graphQLFetch.js";
import queries from "../scripts/query.js";
import NumInput from "../InputComponents/NumInput.jsx";
import TextInput from "../InputComponents/TextInput.jsx";
import DateInput from "../InputComponents/DateInput.jsx";
import SelectInput from "../InputComponents/SelectInput.jsx";
import {
  titleOptions,
  departmentOptions,
  employeeTypeOptions,
  statusOptions,
} from "../scripts/selectOptions.js";
import { Form, Button } from "react-bootstrap";

{
  /*Component to update Employee Record within EMS*/
}
class EmployeeEdit extends React.Component {
  constructor() {
    super();
    this.updateEmployee = this.updateEmployee.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      employee: {},
    };
  }

  componentDidMount() {
    this.loadEmployeeData();
  }

  async loadEmployeeData() {
    const { id } = this.props.match.params;
    {
      /*GraphQL query to fetch the employee data by its Mongo ID*/
    }
    const query = queries.queryToFetchEmployeeById();

    const data = await fetchGraphQL(query, { employeeId: id });
    {
      /*currentStatus: 1 = Working and 0= Retired */
    }
    if (data) {
      const { employee } = data;
      this.setState({
        employee,
      });
    }
  }

  async updateEmployee(e) {
    e.preventDefault();

    {
      /*retrieve user input values from the form 'employeeForm' */
    }
    const form = document.forms.employeeForm;
    const employee = {
      _id: this.state.employee._id,
      title: form.title.value,
      department: form.department.value,
      currentStatus: form.currentStatus.value == "1",
    };

    {
      /*function to update employee information (title, department and current status)*/
    }
    await this.editEmployee(employee);

    {
      /* navigate to Manage page */
    }
    this.props.history.push("/manage");
  }

  async editEmployee(employee) {
    {
      /*GraphQL query to update employee data*/
    }
    const query = queries.queryToUpdateEmployee();

    try {
      const data = await fetchGraphQL(query, { employee });
      if (data) this.loadEmployeeData();
    } catch (e) {
      alert(`Error while sending data to GraphQL server: ${e.message}`);
    }
  }

  handleOnChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;

    this.setState((prevState) => ({
      employee: { ...prevState.employee, [name]: value },
    }));
  }

  render() {
    const {
      employee: {
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
      },
    } = this.state;

    return (
      <>
        <section className="section">
          <div className="pagetitle">
            <h1 className="m-4">Update Employee Information</h1>
          </div>
          <div className="card">
            <div className="card-body">
              <Form
                className="row g-3"
                name="employeeForm"
                method="POST"
                onSubmit={this.updateEmployee}
              >
                <div className="col-md-12">
                  <div className="form-floating">
                    {firstName && (
                      <TextInput
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={firstName || ""}
                        key="FirstNameInput"
                        disabled="disabled"
                      />
                    )}
                    <Form.Label htmlFor="firstName">First Name *</Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {/* {this.state?.errors["firstName"]} */}
                  </Form.Text>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    {lastName && (
                      <TextInput
                        id="lastName"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={lastName || ""}
                        key="LastNameInput"
                        disabled="disabled"
                      />
                    )}
                    <Form.Label htmlFor="lastName">Last Name *</Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {/* {this.state?.errors["lastName"]} */}
                  </Form.Text>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    {age && (
                      <NumInput
                        id="age"
                        name="age"
                        placeholder="Enter age"
                        value={age || ""}
                        key="AgeInput"
                        disabled="disabled"
                      />
                    )}
                    <Form.Label htmlFor="age">Age *</Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {/* {this.state?.errors["age"]} */}
                  </Form.Text>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    {dateOfJoining && (
                      <DateInput
                        id="dateOfJoining"
                        name="dateOfJoining"
                        placeholder="Enter Date of Joining"
                        value={dateOfJoining || ""}
                        key="dateOfJoiningInput"
                        disabled="disabled"
                      />
                    )}

                    <Form.Label htmlFor="dateOfJoining">
                      Date of Joining *
                    </Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {/* {this.state?.errors["dateOfJoining"]} */}
                  </Form.Text>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    {department && (
                      <SelectInput
                        id="department"
                        name="department"
                        placeholder="Enter department"
                        value={department || ""}
                        onChange={this.handleOnChange}
                        key="departmentInput"
                        options={departmentOptions}
                      />
                    )}
                    <Form.Label htmlFor="department">Department*</Form.Label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    {title && (
                      <SelectInput
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={title || ""}
                        onChange={this.handleOnChange}
                        key="titleInput"
                        options={titleOptions}
                      />
                    )}
                    <Form.Label htmlFor="title">Title*</Form.Label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    {employeeType && (
                      <SelectInput
                        id="employeeType"
                        name="employeeType"
                        placeholder="Enter employee type"
                        value={employeeType || ""}
                        key="employeeTypeInput"
                        options={employeeTypeOptions}
                        disabled="disabled"
                      />
                    )}
                    <Form.Label htmlFor="employeeType">Employee Type *</Form.Label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    {currentStatus != undefined && (
                      <SelectInput
                        id="currentStatus"
                        name="currentStatus"
                        placeholder="Enter current status"
                        value={currentStatus ? "1" : "0"}
                        onChange={this.handleOnChange}
                        key="currentStatus"
                        options={statusOptions}
                      />
                    )}
                    <Form.Label htmlFor="currentStatus">
                      Current Status *
                    </Form.Label>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">Update</Button>
                </div>
              </Form>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(EmployeeEdit);
