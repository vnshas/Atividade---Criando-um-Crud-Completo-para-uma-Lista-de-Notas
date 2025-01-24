import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TodoContext = createContext({})

export const TodoProvider = ({children}) =>{
    
   const [todoList, setTodoList] = useState([])
   const [editingTodo, setEditingTodo] = useState(null) 



    useEffect(() =>{
        const getTodos = async () =>{
            try {
                const {data} = await api.get("/todos")
                setTodoList(data)
            } catch (error) {
                console.log(error)
            }
        }
        getTodos()
    }, [])

    const createTodos = async (formData) =>{
        try {
            const {data} = await api.post("/todos", formData)
            setTodoList([...todoList, data])
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteTodos = async (deletingId) =>{
        try {
            await api.delete(`/todos/${deletingId}`)
            const newTodolist = todoList.filter(todo => todo.id !== deletingId)
            setTodoList(newTodolist)
        } catch (error) {
            console.log(error)
        }
    }

    const editTodo = async (formData) =>{
        try {
            const {data} = await api.patch(`/todos/${editingTodo.id}`, formData)

            const newTodoList = todoList.map((todo) =>{
                if(todo.id === editingTodo.id){
                    return data
                }else{
                    return todo
                }
            })
            setTodoList(newTodoList)
            setEditingTodo(null)
        } catch (error) {
            console.log(error)
        }

    }



    return (
      <TodoContext.Provider
        value={{
          todoList,
          createTodos,
          deleteTodos,
          setEditingTodo,
          editingTodo,
          editTodo,
        }}
      >
        {children}
      </TodoContext.Provider>
    );
}