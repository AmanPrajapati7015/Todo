require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

const TodoModel =  require('./models');

const URI = process.env.URI; 

mongoose.connect(URI, {dbName:"Todo"}).then(()=>{
  app.listen(3000, ()=>{console.log("started at port 3000");})
})


const app = express();


app.use(express.json())
app.use(express.static("public"));
app.use(cors())


//get all todos
app.get('/todos', async (req, res) => {
  const todos = await TodoModel.find({})
  res.send(todos);
})


//adds todo in data body{title, description, completed} sends {id}
app.post('/todos', async (req, res)=>{
  let id = Date.now();
  const newTodo = new TodoModel({...req.body,completed:false, id});  
  console.log(newTodo);
  await newTodo.save();
  res.status(201).json({id})
})

//id in url body{ "completed": true } update todo[id]
app.put('/todos/:id', async(req, res)=>{
  let id = req.params.id;
  let completed = req.body.completed;
  await TodoModel.findOneAndUpdate({id}, {completed});
  res.send("updated");
})

//delete a tody by its id;
app.delete('/todos/:id', async(req, res)=>{
  let id = req.params.id;
  await TodoModel.findOneAndDelete({id});
  res.send("deleted")
})

app.all("*",(req, res)=>{
  res.status(404).send("Route not found")
})


