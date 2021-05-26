const { Schema, model } = require('mongoose');

const calculatorSchema = new Schema({
    operation: String,
    number_one: Number,
    sign: String,
    number_two: Number,
    result: Number
});

module.exports = model('Calculator', calculatorSchema);