import styles from "../Component/todoList.module.css"
// todo MainComponent
export function TodoList(props){

    // Destructuring props 
    const { todos, 
            handleCompleted,
            newTodo,
            setNewTodo,
            handleAddTodo,
            handleDeleteTodo,
            handleUpdateTodo,
            filterTodo,
            setFilterTodo} =props;

    // Appling filters if any (All, Completed, Pending) to display as per
    const filteredTodos = todos.filter(todo => {
        if (filterTodo === "All") {
            return true;
        } else if (filterTodo === "Completed") {
            return todo.completed;
        } else {
            return !todo.completed;
        }
    });


    return (
        <>
            <div className={styles.container}>

                <h1>To-Do List</h1>  

                {/* input for todo to be added or updated */}
                <div className={styles.inputSection}>
                    <input type="text" 
                           className={styles.todoInput} 
                           placeholder="Add YoUr todOs..!"
                           value={newTodo}
                          onChange={(e) => setNewTodo(e.target.value)}/>
                    {/* Add button to add todo */}
                    <button  onClick={handleAddTodo}>Add</button>
                </div>

                {/* Todo List Container */}
                <div className={styles.todoListConatiner}>
                    <ul id="todo-list">
                        {/* filtered todoList array */}
                        {filteredTodos.map((todo, index)=>(
                            <li key={index}>
                                {/* Check box to toggle completed status */}
                                <input type="checkbox" className={styles.checkbox}  
                                    checked={todo.completed ? true : false}
                                    onChange={() => handleCompleted(todo)}/>   
                                {/*if completed, strikes the todo  */}
                                <span className={todo.completed ? styles.completed : null}>{todo.title}</span>

                                {/* button to update a particular Todo */}
                                <button className={styles.updateBtn}
                                    onClick={()=>handleUpdateTodo(todo,newTodo)}>
                                    Update
                                </button>

                                {/* Button to delete a todo */}
                                <button className={styles.delete}
                                        onClick={()=>handleDeleteTodo(todo)}
                                >
                                    Delete
                                </button>
                            </li>
                            ))}
                    </ul>
                </div>

                {/* updates count of todo in Filtered List */}
                <div id="todo-count">
                    <h5>Total Tasks: {filteredTodos.length}</h5>
                    <span>Lets make a ToDo-List for your day!!</span>
                </div>

                {/* Filter Buttons */}
                <div className={styles.filterButtons}>
                <button onClick={() => setFilterTodo("All")}>All</button>
                <button onClick={() => setFilterTodo("Completed")}>Completed</button>
                <button onClick={() => setFilterTodo("Pending")}>Pending</button>
                </div>

            </div>
        </>
    )
}