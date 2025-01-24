import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TodoContext = createContext({})

export const TodoProvider = ({children}) =>{
    
    const {data: todoList} = useQuery({queryKey:["todos"], queryFn: async () => {
        const {data} = await api.get("/todos")
        return data
    }})

   
   const [editingTodo, setEditingTodo] = useState(null) 

   const client = useQueryClient()

    const revalidate = () =>{
    client.invalidateQueries({queryKey: ["todos"]})
}

    const createTodos = useMutation({
        mutationFn: async (formData) => {
            return await api.post("/todos", formData)
        },
        onSuccess: revalidate(),
    })   
    
    const deleteTodos= useMutation({
        mutationFn: async (deletingId) =>{
            return await api.delete(`/todos/${deletingId}`)
        },
        onSuccess: () =>{
            alert("Exclusão feita com sucessso."),
            revalidate()
        }
    })

    const editTodo = useMutation({
        mutationFn: async (formData) => {
            return await api.patch(`/todos/${editingTodo.id}`, formData)
        },
        onSuccess: () =>{
            setEditingTodo(null),
            revalidate()
        }
    })

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