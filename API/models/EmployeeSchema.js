const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for Employee information
const EmployeeSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: [true, 'Please provide first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name']
    },
    age: {
        type: Number,
        required: [true, 'Please provide age']
    },
    dateOfJoining: {
        type: Date,
        required: [true, 'Please provide date of joining']
    },
    title: {
        type: String,
        required: [true, 'Please provide title'],
    },
    department: {
        type: String,
        required: [true, 'Please provide department'],
    },
    employeeType: {
        type: String,
        required: [true, 'Please provide employee type']
    },
    currentStatus: {
        type: Boolean,
        required: [true, 'Please provide current status']
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;

