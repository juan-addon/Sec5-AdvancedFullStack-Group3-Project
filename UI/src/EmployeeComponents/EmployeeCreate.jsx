import React from "react";
import { withRouter } from "react-router-dom";
import fetchGraphQL from "../scripts/graphQLFetch.js";
import queries from "../scripts/query.js";
import handleFormValidation from "../scripts/validation.js";
import NumInput from "../InputComponents/NumInput.jsx";
import TextInput from "../InputComponents/TextInput.jsx";
import DateInput from "../InputComponents/DateInput.jsx";
import SelectInput from "../InputComponents/SelectInput.jsx";
import {
  titleOptions,
  departmentOptions,
  employeeTypeOptions,
} from "../scripts/selectOptions.js";

import { Form, Button } from "react-bootstrap";

{
  /*Component to create new Employee Record within EMS*/
}
class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      errors: [],
      employee: {},
      invalidInputs: {},
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }

  async addEmployee(e) {
    e.preventDefault();

    {
      /*retrieve user input values from the form 'employeeForm' and the currentStatus is by default true(Working)*/
    }
    const form = document.forms.employeeForm;
    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: true,
    };

    {
      /* check if the user input values are valid. Create employee data only if the form is valid*/
    }
    let formErrors = await handleFormValidation(employee);

    {
      /*Save Employee information only if the form is valid*/
    }
    if (Object.keys(formErrors).length <= 0) {
      await this.createEmployee(employee);

      {
        /*navigate to Manage page once the employee has been created */
      }
      this.props.history.push("/manage");
    } else {
      /*once the form is submitted, scroll top to the Employee information so that the newly created data 
			can be seen easily*/
      this.setFormErrors(formErrors);
      scrollIntoContentView();
      {
        /*scroll to top where errors are displayed.*/
      }
    }
  }

  async createEmployee(employee) {
    {
      /*GraphQL query to add employee data*/
    }
    const query = queries.queryToAddEmployee();

    try {
      const data = await fetchGraphQL(query, { employee });

      if (data) this.loadEmployeeData();
    } catch (e) {
      alert(`Error while sending data to GraphQL server: ${e.message}`);
    }
  }

  async loadEmployeeData() {
    {
      /*GraphQL query to fetch the employee data*/
    }
    const query = queries.queryToFetchEmployee();

    const data = await fetchGraphQL(query);
    if (data) {
      this.setState({ employees: data.employeeList });
    }
  }

  setFormErrors(formErrors) {
    this.setState({
      errors: formErrors,
    });
  }

  handleOnChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;

    this.setState((prevState) => ({
      employee: { ...prevState.employee, [name]: value },
    }));
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidInputs = { ...prevState.invalidInputs, [name]: !valid };
      if (valid) delete invalidInputs[name];
      return { invalidInputs };
    });
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
      },
      invalidInputs,
    } = this.state;

    if (Object.keys(invalidInputs).length !== 0) {
      const { errors } = this.state;
      errors["dateOfJoining"] = "Please provide valid date of joining.";
    }

    return (
      <>
        <section className="section">
          <div className="pagetitle">
            <h1 className="m-4">Add Employee</h1>
          </div>
          <div className="card">
            <div className="card-body">
              <Form
                className="row g-3"
                name="employeeForm"
                method="POST"
                onSubmit={this.addEmployee}
              >
                <div className="col-md-12">
                  <div className="form-floating">
                    <TextInput
                      id="firstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={this.handleOnChange}
                      key="FirstNameInput"
                    />
                    <Form.Label htmlFor="firstName">First Name *</Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {this.state?.errors["firstName"]}
                  </Form.Text>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    <TextInput
                      id="lastName"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={this.handleOnChange}
                      key="LastNameInput"
                    />
                    <Form.Label htmlFor="lastName">Last Name *</Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {this.state?.errors["lastName"]}
                  </Form.Text>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    <NumInput
                      id="age"
                      name="age"
                      placeholder="Enter Age"
                      value={age}
                      onChange={this.handleOnChange}
                      key="AgeInput"
                    />
                    <Form.Label htmlFor="age">Age *</Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {this.state?.errors["age"]}
                  </Form.Text>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    <DateInput
                      id="dateOfJoining"
                      name="dateOfJoining"
                      placeholder="Enter Date of Joining"
                      value={dateOfJoining}
                      onChange={this.handleOnChange}
                      key="DateofJoiningInput"
                    />

                    <Form.Label htmlFor="dateOfJoining">
                      Date of Joining *
                    </Form.Label>
                  </div>
                  <Form.Text className="text-danger">
                    {this.state?.errors["dateOfJoining"]}
                  </Form.Text>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <SelectInput
                      value={title}
                      name="title"
                      options={titleOptions}
                    />
                    <Form.Label htmlFor="title">Title*</Form.Label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <SelectInput
                      value={department}
                      name="department"
                      options={departmentOptions}
                    />
                    <Form.Label htmlFor="department">Department*</Form.Label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-floating">
                    <SelectInput
                      value={employeeType}
                      name="employeeType"
                      options={employeeTypeOptions}
                    />
                    <Form.Label htmlFor="employeeType">Employee Type *</Form.Label>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary">Save</Button>
                </div>
              </Form>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(EmployeeCreate);
