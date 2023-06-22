function queryToAddEmployee() {
    return `mutation 
                addEmployee($employee: EmployeeInputs!) {
                    addEmployee(employee: $employee) {
                        firstName lastName age dateOfJoining title department employeeType currentStatus 
                    }
                }`;
}

function queryToFetchEmployee() {
    return ` query Query($employeeType: EmployeeType, $search: String) {
            employeeList(employeeType: $employeeType, search: $search) {
                _id id firstName lastName age dateOfJoining title department employeeType currentStatus
            }
          }`;
}

function queryToFetchEmployeeById() {
    return `query 
                Employee($employeeId: ID!) {
                    employee(id: $employeeId) {
                    _id
                    id
                    firstName
                    lastName
                    age
                    dateOfJoining
                    title
                    department
                    employeeType
                    currentStatus
                    }
                }`;
}

function queryToUpdateEmployee() {
    return `mutation 
                updateEmployee($employee: UpdateEmployeeInputs!) {
                    updateEmployee(employee: $employee) {
                        title department currentStatus 
                    }
                }`;
}

function queryToDeleteEmployee() {
    return `mutation 
                DeleteEmployee($employeeId: ID!) {
                    deleteEmployee(employeeId: $employeeId)
                }`;
}

export default {
    queryToAddEmployee,
    queryToFetchEmployee,
    queryToFetchEmployeeById,
    queryToUpdateEmployee,
    queryToDeleteEmployee
}                   