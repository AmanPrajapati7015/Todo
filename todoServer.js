
const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser')
const path = require("path");
const cors = require("cors")

let todoData = {}
//read and update the global variable todoData

const app = express();

app.use(bodyParser.json())
app.use(cors())


//get all todos
app.get('/todos', (req, res) => {
  fs.readFile("data.json","utf-8",(err, data)=>{
    if(err) throw err;
    todoData = JSON.parse(data)
    let arr = []
    for(const id in todoData){
      todoData[id]["id"] = +id;
      arr.push(todoData[id]) 
    }
    res.send(arr)
  })
})


//adds todo in data body{title, description, completed} sends {id}
app.post('/todos', (req, res)=>{
  console.log(req.body);
  let title = req.body.title;
  let description = req.body.description;
  let completed = req.body.completed;

  fs.readFile("data.json","utf-8",(err, data)=>{
    if(err) throw err;
    todoData = JSON.parse(data)
    var curID = Math.floor((Math.random() * 10000));
    todoData[curID] = {title,description,completed}
    res.status(201).json({id:curID});
    let dataStr = JSON.stringify(todoData)
    fs.writeFile("data.json",dataStr,(err)=>{
      if(err) throw err;
    })
  })
})

//id in url body{"title": "Buy groceries", "completed": true } update todo[id]
// app.put('/todos/:id', (req, res)=>{
//   let id = req.params.id;
//   fs.readFile("data.json","utf-8",(err, data)=>{
//     if(err) throw err;
//     todoData = JSON.parse(data)    
//     if (!!(id in todoData)) {
//       todoData[id].title = req.body.title;
//       todoData[id].completed = req.body.completed;
//       let dataStr = JSON.stringify(todoData)
//       fs.writeFile("data.json",dataStr,(err)=>{
//         if(err) throw err;
//       })
//       res.send("updated")
//     }
//     else{
//       res.status(404).send("Not Found")
//     }    
//   })
// })


//delete a tody by its id;
app.delete('/todos/:id', (req, res)=>{
  let id = req.params.id;

  fs.readFile("data.json","utf-8",(err, data)=>{
    if(err) throw err;
    todoData = JSON.parse(data)
    console.log(id);   
    if (!!(id in todoData)) {
      delete todoData[id];
      let dataStr = JSON.stringify(todoData)
      fs.writeFile("data.json",dataStr,(err)=>{
        if(err) throw err;
      })
      res.send("delete")
    }
    else{
      res.status(404).send("Not Found")
    }    
  })
})


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "index.html"));
})

app.all("*",(req, res)=>{
  res.status(404).send("Route not found")
})

app.listen(3000, ()=>{console.log("started at port 3000");})


// module.exports = app;

