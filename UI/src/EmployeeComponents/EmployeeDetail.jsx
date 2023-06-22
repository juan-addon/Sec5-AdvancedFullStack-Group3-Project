import React from "react";
import fetchGraphQL from "../scripts/graphQLFetch.js";
import queries from "../scripts/query.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";

{
  /*Component to view Employee Information*/
}
class EmployeeDetail extends React.Component {
  constructor() {
    super();
    this.state = { employee: {} };
  }

  componentDidMount() {
    this.loadEmployeeData();
  }

  async loadEmployeeData() {
    {
      /* get route parameter variables */
    }
    const { id } = this.props.match.params;

    {
      /*GraphQL query to fetch the employee data*/
    }
    const query = queries.queryToFetchEmployeeById();

    const data = await fetchGraphQL(query, { employeeId: id });
    if (data) {
      const employeeData = data.employee;

      // Calculate date of birth
      const dateOfBirth = moment(
        employeeData.dateOfJoining.toISOString().split("T")[0]
      )
        .subtract(employeeData.age, "years")
        .startOf("day");

      // Calculate retirement date
      const retirementDate = moment(dateOfBirth)
        .add(65, "years");

      // Calculate time left until retirement
      const currentDate = moment();

      const duration = moment.duration(retirementDate.diff(currentDate));
      const years = duration.years();
      const months = duration.months();

      // Get number of business days between current date and retirement date
      let businessDays = 0;
      let endDate = moment(currentDate.subtract(1, "days"))
        .add(years, "years")
        .add(months, "months");
      while (endDate.isBefore(retirementDate)) {
        if (endDate.isoWeekday() !== 6 && endDate.isoWeekday() !== 7) {
          businessDays++;
        }
        endDate.add(1, "day");
      }

      // Format the date of joining
      const dateOfJoining = moment(
        employeeData.dateOfJoining.toISOString().split("T")[0]
      ).format("Do MMMM YYYY");

      // Format retirement date
      const formattedRetirementDate = retirementDate.subtract(1, "days").format("Do MMMM YYYY");

      const outputString = `Date of Joining ${dateOfJoining},
          Age at the time of Joining: ${
            employeeData.age
          } yrs, Retirement Date: ${formattedRetirementDate}.
          So the no of days, months and years from today (${currentDate.add(1, "days").format(
            "Do MMMM YYYY"
          )}) => ${years} years, ${months} months, ${businessDays} days`;

      // Add output string to employee object
      employeeData.employeeRetirementDate = outputString;
      employeeData.dateOfJoining = dateOfJoining;

      this.setState({ employee: employeeData });
    }
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
        employeeRetirementDate,
      },
    } = this.state;

    return (
      <>
        <Container>
          <section className="section profile">
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <div className="tab-content pt-2">
                      <div
                        className="tab-pane fade show active profile-overview"
                        id="profile-overview"
                      >
                        <h5 className="card-title">About</h5>
                        <p className="fst-italic text-danger">
                          {employeeRetirementDate || ""}
                        </p>

                        <h5 className="card-title">Employee Details</h5>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Full Name
                          </Col>
                          <Col lg={9} md={8}>
                            {firstName || ""} {lastName || ""}
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Department
                          </Col>
                          <Col lg={9} md={8}>
                            {department || ""}
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Title
                          </Col>
                          <Col lg={9} md={8}>
                            {title || ""}
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Employee Type
                          </Col>
                          <Col lg={9} md={8}>
                            {employeeType?.replace("_", " ") || ""}
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Date of Joining
                          </Col>
                          <Col lg={9} md={8}>
                            {dateOfJoining}
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Employee Age
                          </Col>
                          <Col lg={9} md={8}>
                            {age || ""}
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={3} md={4} className="label">
                            Current Status
                          </Col>
                          <Col lg={9} md={8}>
                            {currentStatus == 1 ? "Working" : "Retired"}
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </>
    );
  }
}

export default EmployeeDetail;
