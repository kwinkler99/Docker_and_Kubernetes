const { Schema, model } = require('mongoose');

const calculatorSchema = new Schema({
    number: Number
});

module.exports = model('Calculator', calculatorSchema);