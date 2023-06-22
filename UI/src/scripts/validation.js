/*
  Function to validate the employee form inputs before submitting them to graphql and mongodb.
*/
const handleFormValidation = async (employee) => {
    let formErrors = {};
    const { firstName, lastName, age, dateOfJoining } = employee;

    {/*regex to validate name with atleast 3 characters and without any special characters*/ }
    let nameRegex = new RegExp("^[a-zA-Z]{3,}$");

    if (firstName == "") {
        formErrors["firstName"] = "First name is required.";
    } else if (!(nameRegex.test(firstName))) {
        formErrors["firstName"] = "First name must be atleast 3 characters and cannot contain special characters.";
    }

    if (lastName == "") {
        formErrors["lastName"] = "Last name is required.";
    } else if (!nameRegex.test(lastName)) {
        formErrors["lastName"] = "Last name must be atleast 3 characters and cannot contain special characters.";
    }

    if (isNaN(age)) {
        formErrors["age"] = "Age is required.";
    } else if (age < 20 || age > 70) { /*Allow age to be between 20 and 70*/
        formErrors["age"] = "Age can be between 20-70 only.";
    }

    if (dateOfJoining == "") {
        formErrors["dateOfJoining"] = "Date of Joining is required.";
    } else if (!dateOfJoining.match(/^(?!0000)(?:1[6-9]|[2-9]\d)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/)) {
        formErrors["dateOfJoining"] = "Invalid Date of Joining format.";
    }

    return formErrors;
}

export default handleFormValidation;