import { useContext } from "react"
import { TodoContext } from "../../providers/TodoContext"

export const TodoList = () => {
  const { todoList, deleteTodos, setEditingTodo } = useContext(TodoContext);  

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <button onClick={() => deleteTodos(todo.id)}>Excluir</button>
          <button onClick={()=> setEditingTodo(todo)}>Editar</button>
        </li>
      ))}
    </ul>
  );
};