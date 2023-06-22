const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema where the counter’s value is updated based on the count of inserted documents
const CounterSchema = new Schema({
    _id: String,
    current: Number
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;

