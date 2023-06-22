const Employee = require("../models/EmployeeSchema.js");
const { getNextSequence } = require("../db/db.js");

//using GraphQL to fetch employee data
async function getDBEmployeeList(_, { employeeType, search }) {
  let query = {};

  if (employeeType) {
    query.employeeType = employeeType;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    const age = parseInt(search);

    if (!isNaN(age)) {
      query.age = age;
    } else {
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { title: regex },
        { department: regex },
      ];
    }
  }

  return await Employee.find(query);
}

//using GraphQL to create employee data from MongoDB
async function dbAddEmployee(_, { employee }) {
  employee.id = await getNextSequence("employee");

  //add employee data to MongoDB
  const result = await Employee.create(employee);
  const savedEmployee = await Employee.findById(result._id);
  return savedEmployee;
}

//fetch employee information by its id
async function getEmployee(_, { id }) {
  return Employee.findById(id);
}

//using GraphQL to update selected employee data and return the updated employee info
async function dbUpdateEmployee(_, { employee }) {
  const result = await Employee.findByIdAndUpdate(employee._id, employee);
  const savedEmployee = await Employee.findById(result._id);
  return savedEmployee;
}

//function to delete employee information
async function dbDeleteEmployee(_, { employeeId }) {
  await Employee.findByIdAndDelete(employeeId);
  return true;
}

module.exports = {
  getDBEmployeeList,
  dbAddEmployee,
  getEmployee,
  dbUpdateEmployee,
  dbDeleteEmployee,
};
