require("dotenv").config();
const mongoose = require('mongoose');
const Counter = require('../models/CounterSchema.js')
const Employee = require('../models/EmployeeSchema.js')

//initial employee list that will be populated in the database
const employeeDB = [
    {
        id: 1,
        firstName: 'Smriti',
        lastName: 'Mool',
        age: 25,
        dateOfJoining: new Date('2017-08-15'),
        title: "Employee",
        department: "Engineering",
        employeeType: "Full_Time",
        currentStatus: 1
    },
    {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        age: 45,
        dateOfJoining: new Date('2022-08-15'),
        title: "Manager",
        department: "Engineering",
        employeeType: "Full_Time",
        currentStatus: 1
    }
];

//function to connect to MongoDB server
const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URL,
        { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
            if (error)
                console.log("Connection to MongoDB failed with error :: ", error);
            else
                console.log("Connected to the MongoDB database");
        });
}

//insert data in the database when the server starts
async function seedInitialData() {
    await Employee.deleteMany({});
    await Counter.deleteMany({});
    await Employee.create(employeeDB);
    await Counter.create({ _id: 'employee', current: 2 });
}

//increments the current field in the Counter and returns a unique value that should be in the next sequence
async function getNextSequence(name) {
    const result = await Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnOriginal: false },
    );
    return result.current;
}

module.exports = { dbConnect, seedInitialData, getNextSequence }