var yo = require('yo-yo')
const uuidv1 = require('uuid/v1')

var numbers = []; // start empty 
var el = list(numbers, update, deleteTodo, generate);

function list (items, onclick, deleteTodo){
return yo`<main role="main">
  <h1>Things ToDo:</h1>
  <div class="ctas">
    <input type="text" id="todoVal">
    <button id="addTodoButt" class="button-secondary pure-button" onclick=${onclick}>Add To-do</button>
  </div>
  <ul id="todoList">    
   ${items.map(function(item){
     if(item.status === 'pending'){
       console.log(item);
       return generate(item);                      
      }
    })}
  </ul>
  <h1>Done:</h1>
  <ul id="doneList">
    ${items.map(function (item) {
      if(item.status === "done"){
        return yo`<li id=${item.id}>
        ${item.value}
        <button onclick=${deleteTodo} class="btn">Pending</button>
        </li>`
      }
    })}
  </ul>
</main>`
}

function generate(item){
 console.log("Generate", item)  
 return yo`<li id=${item.id}>
     ${item.value}
     <input type="checkbox" onclick=${deleteTodo} class="btn">
     </li>`
}

function update () {
// add a new random number to our list
var todo = {};
  todo.id = uuidv1();
  todo.value = document.getElementById("todoVal").value;
  todo.status = 'pending';

numbers.push(todo)

// construct a new list and efficiently diff+morph it into the one in the DOM
var newList = list(numbers, update, deleteTodo)
yo.update(el, newList)
}

function deleteTodo(ev){
var id = ev.target.parentNode.getAttribute('id');

numbers = numbers.filter(function(el){
  if(el.id === id){
    if(el.status === "pending"){
      el.status = "done";
    }
    else{
      el.status = "pending";
    }
  }
  return true;
})

var newList = list(numbers, update, deleteTodo);
yo.update(el, newList)
}

document.body.appendChild(el)