import React from 'react'
import './App.css'



// add to notes about useTodos (custom hooks)

//hook for main Todo State variable 
function useTodos(){
  const [todos, setTodos] = React.useState([])

  React.useEffect(()=>{
    fetch("http://localhost:3000/todos").then((resp)=>{
        resp.json().then((data)=>{
          setTodos(data)
        })
    })

    // setInterval(()=>{
    //   fetch("http://localhost:3000/todos").then((resp)=>{
    //     resp.json().then((data)=>{
    //       setTodos(data)
    //     })
    //   })
    // },10000)

  },[]);

  return {todos, setTodos};
}


function App() {
  let {todos, setTodos}= useTodos();
  console.table(todos);

  console.log("dom updated")

  const handleDelete = (id)=>{
    fetch(`http://localhost:3000/todos/${id}`, {method:"DELETE"}).then((resp)=>{
      if(resp.status== 200){
        setTodos(todos.filter((todo)=>{          
          return todo.id !== id;
        }))
        console.log("delete successfully");
      }
    })
  }

  const handleAdd = ()=>{
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let body= { title, description, completed:false }
    fetch("http://localhost:3000/todos/", {
        method:"POST",
        body:JSON.stringify(body),
        headers:{"Content-Type":"application/json"}
    }).then((res)=>{
      if (res.status == 201){
        res.json().then((data)=>{
          let newTodo = {...body, id:data.id}
          setTodos(todos.concat(newTodo))
          document.querySelector("#title").value="";
          document.querySelector("#description").value="";
        })
      }
    })
  }

  const handleToggle = (id)=>{
    let pickedTodo = todos.find((todo)=>{return todo.id==id})
    
    fetch(`http://localhost:3000/todos/${id}`, {
      method:"PUT", 
      body:JSON.stringify({completed:!pickedTodo.completed}),
      headers:{"Content-Type":"application/json"}
      }).then(res=>{
        if(res.status == 200){
          setTodos(todos.map(todo=>{
            if(todo.id == id)
              todo.completed = !todo.completed
            return todo;
          }))
        }
      })
  }


  return (
    <>
    <Input onAdd={handleAdd}/>
    {
    todos.map((todo)=>{
      return <Todo completed={todo.completed} title={todo.title} description={todo.description} todoId={todo.id} toggleStaus={handleToggle} onDelete={handleDelete}/>
    })
    }
    </>
  )
}

// componets....
function Input(props){
  return (
    <>
    <div class="add-todo">
    <input type="text" id="title" placeholder='Title' />
    <input type="text" id="description" placeholder='Description...' />
    <button onClick={()=>{props.onAdd()}}>Add Todo</button>
    </div>
    </>
  )
}

function Todo(props){
  return(
    <>
    <div class="todo" >
      <p>{props.completed?"done":"Left"}</p>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <button onClick={()=>{props.toggleStaus(props.todoId)}}>Toggle Status</button>
      <button onClick={()=>{props.onDelete(props.todoId)}} >Delete</button>
    </div>
    <br/>
    </>
  )
}




export default App
