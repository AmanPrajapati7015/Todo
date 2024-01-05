const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    completed:Boolean
});

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;;