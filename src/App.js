import { useEffect, useState } from 'react';
import styles from "./App.module.css";
import { TodoList } from './Component/todoList';

function App() {

  // State that handle doto array List
  const [todos, setTodos] = useState([]);
  // State for new Todos to be added
  const [newTodo, setNewTodo] = useState("");
  // State to handle Filters
  const [filterTodo, setFilterTodo] = useState("All");

  // Fetching todos in API on initial render
  useEffect(()=>{

    async function fetchTodos(){

      const data = await fetch("https://jsonplaceholder.typicode.com/todos")
                          .then((response) => response.json())
                          .then((data) => setTodos(data));
    }

    fetchTodos();
  },[]);

  
// Handles Completed status of a Todo
  const handleCompleted = (todo) => {
    // Toggle the completed state of the todo item
    const updatedTodos = todos.map((item) =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item
    );
    // Update the todos state with the updated todos array
    setTodos(updatedTodos);
};

// Handles Adding  new Todo
const handleAddTodo = ()=>{
  const newId = todos.length + 1;
    const newTodoItem = {
      id: newId,
      title: newTodo,
      completed: false
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
}

// Handles Deleting a Todo
const handleDeleteTodo = (todo)=>{
  const updatedTodoList = todos.filter((item)=>item.id !== todo.id);
  setTodos(updatedTodoList);
}

//  Handles Updating a Todo
const handleUpdateTodo = (todo, newTodo)=>{
  console.log(newTodo)
  const updatedTodo = todos.map((item) =>
  item.id === todo.id ? { ...item, title: newTodo } : item
);

console.log(updatedTodo);
setTodos(updatedTodo);

}



  return (
    <div className={styles.App}>
      {/* passing states and functions via props */}
      <TodoList todos={todos} 
                setTodos={setTodos} 
                handleCompleted={handleCompleted} 
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                handleAddTodo={handleAddTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
                filterTodo={filterTodo}
                setFilterTodo={setFilterTodo}
                />
    </div>
  );
}

export default App;
