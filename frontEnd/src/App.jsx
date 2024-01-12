import React from 'react'
import './App.css'


// let url = "https://todo-app-sx1g.onrender.com/todos"
let url = "http://localhost:3000/todos/"

//hook for main Todo State variable 
function useTodos(){
  const [todos, setTodos] = React.useState([])

  React.useEffect(()=>{
    function fetchTodos() {
      fetch(url).then((resp)=>{
          resp.json().then((data)=>{
            setTodos(data)
          })
      })
    }
    fetchTodos();
    setInterval(fetchTodos,10000)
  },[]);

  return {todos, setTodos};
}


function App() {
  let {todos, setTodos}= useTodos();
  console.table(todos);

  console.log("dom updated")

  const handleDelete = (id)=>{
    fetch(url+id, {method:"DELETE"}).then((resp)=>{
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
    fetch(url, {
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
    
    fetch(url+id, {
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
    <div class="todos">
    {
    todos.map((todo)=>{
      return <Todo completed={todo.completed} title={todo.title} description={todo.description} todoId={todo.id} toggleStaus={handleToggle} onDelete={handleDelete}/>
    })
    }
    </div>
    </>
  )
}

// componets....
function Input(props){
  return (
    <>
    <div class="inputs">
        <div class="row">
            <input type="text" id="title" placeholder="Title" />
        </div>
        <div class="row">
            <input type="text" id="description" placeholder="Description"/>
            <button onClick={()=>{props.onAdd()}} >ADD</button>
        </div>
    </div>
    </>
  )
}

function Todo(props){
  return(
    <>
    <div class="todo">
      <button onClick={()=>{props.toggleStaus(props.todoId)}}>
          <img class="todo-status" src={props.completed?"./src/assets/done.svg":"./src/assets/not-done.svg"} alt=""/>
      </button>
      <details>
          <summary class={props.completed?"done":""}>{props.title}</summary>
          <p>{props.description}</p>
      </details>
      <button onClick={()=>{props.onDelete(props.todoId)}} class="todo-delete">
          <img src="./src/assets/delete.svg" alt=""/>
      </button>
    </div>
    <hr/>  
    </>
  )
}




export default App
