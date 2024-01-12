import React from 'react'
 
function Input(props){

    const [todoTitle, setTitle] = React.useState("");
    const [todoDescription, setDescription ] = React.useState("");

    return (
        <>
        <div className="inputs">
            <div className="row">
                <input onChange={(e)=>{setTitle(e.target.value)}} type="text" id="title" placeholder="Title" />
            </div>
            <div className="row">
                <input onChange={(e)=>{setDescription(e.target.value)}} type="text" id="description" placeholder="Description"/>
                <button onClick={()=>{props.onAdd(todoTitle, todoDescription)}} >ADD</button>
            </div>
        </div>
        </>
    )
}
export default Input

