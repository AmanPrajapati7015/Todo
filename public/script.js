

let backEndUrl = "http://localhost:3000/"

function deleteTodo(id){
    fetch(backEndUrl+`todos/${id}`, {method:"DELETE"}).then((resp)=>{
        if(resp.status== 200){
            console.log("delete successfully");
            getData()
        }
    })
}
function getData(){
    fetch(backEndUrl+"todos/", {method:"GET"}).then((resp)=>{
        resp.json().then((Todos)=>{
            const container = document.querySelector("div.data")
            container.innerHTML = ""

            for (let i =0; i<Todos.length;i++){
                let row = document.createElement("div")
                let title = document.createElement("h3")
                let discription = document.createElement("p")
                let del = document.createElement("button")
                title.textContent = Todos[i].title;
                discription.textContent = Todos[i].description;
                del.textContent = "Delete";
                del.setAttribute("onclick", `deleteTodo(${Todos[i].id})`)
                row.appendChild(title)
                row.appendChild(discription)
                row.appendChild(del)
                container.appendChild(row)
            }
        })
    })
}

getData()

function send(){
    body= {
        title: document.querySelector("#title").value,
        description: document.querySelector("#discription").value,
        completed:false
    }
    fetch(backEndUrl+"todos/", {
        method:"POST",
        body:JSON.stringify(body),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        document.querySelector("#title").value="";
        document.querySelector("#discription").value="";
        res.json().then((data)=>{
            console.log(data);
        })
        getData();
    })
}