import React from "react";
import EmployeeTable from "./EmployeeTable.jsx";
import fetchGraphQL from "../scripts/graphQLFetch.js";
import queries from "../scripts/query.js";
import URLSearchParams from "url-search-params";
import moment from "moment";
import { Form } from "react-bootstrap";
import { employeeTypeOptions } from "../scripts/selectOptions.js";

{
  /* Component which includes Search and Employee Table*/
}
export default class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      showUpcomingRetiresFilter: false,
      employeeTypeFilter: "",
      filteredEmployees: [],
    };
  }

  componentDidMount() {
    this.loadEmployeeData();
  }

  componentDidUpdate(prevProps) {
    {
      /*reloading the employee data if required, by comparing the previous and new query string in employee list*/
    }
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.loadEmployeeData();
    }
  }

  async loadEmployeeData() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    {
      /*used for parsing of the query string */
    }

    {
      /* variable that we can supply to the GraphQL as a query variable. 
            The params.get() method returns null if the parameter is not present*/
    }
    const variables = {};
    if (params.get("employeeType"))
      variables.employeeType = params.get("employeeType");
    {
      /*GraphQL query to fetch the employee data */
    }

    if (params.get("search"))
      variables.search = params.get("search");
    {
      /*GraphQL query to fetch the employee data */
    }
    const query = queries.queryToFetchEmployee();
    
    const data = await fetchGraphQL(query, variables);
    const retirementAge = 65; // Assuming retirement age is 65

    if (data) {

      if (params.get("upcomingRetirement")) {
        //const upcomingRetirement = params.get("upcomingRetirement");
        const currentDate = moment();
        const sixMonthsFromNow = moment().add(6, "months");
        const upcomingRetireEmployees = data.employeeList.filter((employee) => {
          const dateOfJoining = moment(employee.dateOfJoining);
          const yearsToRetirement = retirementAge - employee.age;
          const retirementDate = dateOfJoining.add(yearsToRetirement, "years");
          return retirementDate.isBetween(
            currentDate,
            sixMonthsFromNow,
            null,
            "[]"
          );
        });
        this.setState({
          employees: upcomingRetireEmployees,
          showUpcomingRetirementMessage: true,
          employeeTypeFilter: ""
        });
      } else {
        this.setState({
          employees: data.employeeList,
          showUpcomingRetirementMessage: false,
          employeeTypeFilter: ""
        });
      }
    }
  }

  filterEmployees = async (selectedValue) => {
    // use the selectedValue to filter the employee data
    const filteredData = this.state.employees.filter((employee) => {
      return employee.employeeType === selectedValue;
    });
    // update the state with the filtered data
    this.setState({ filteredEmployees: filteredData });
  };

  render() {
    const {
      showUpcomingRetirementMessage,
      employees,
      employeeTypeFilter,
      filteredEmployees,
    } = this.state;

    // use filteredEmployees if employeeTypeFilter is not empty, otherwise use employees
    const displayEmployees =
      employeeTypeFilter !== "" ? filteredEmployees : employees;

    return (
      <>
        <section className="section">
          <div className="pagetitle">
            <h1 className="m-4">Home Page</h1>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  {showUpcomingRetirementMessage && (
                    <div>
                      <div className="alert alert-warning" role="alert">
                        These employees are due to retire in the next 6 months.
                      </div>
                      <div className="filter-bar">
                        <div className="filter">
                          <div className="form-floating">
                            <Form.Select
                              id="employeeType"
                              name="employeeType"
                              placeholder="Enter employee type"
                              key="employeeTypeInput"
                              onChange={(event) => {
                                const selectedValue = event.target.value;
                                this.setState(
                                  { employeeTypeFilter: selectedValue },
                                  () => {
                                    this.filterEmployees(selectedValue);
                                  }
                                );
                              }}
                            >
                              <option key="All" value="">
                                All
                              </option>
                              {/* Render an option element for each employee type */}
                              {employeeTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Label htmlFor="employeeType">
                              Employee Type *
                            </Form.Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <EmployeeTable employees={displayEmployees} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
