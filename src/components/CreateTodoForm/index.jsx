import { useContext } from "react"
import { useForm } from "react-hook-form"
import { TodoContext } from "../../providers/TodoContext"

export const CreateTodoForm = () => {
   const {register, handleSubmit} = useForm()
   
   const {createTodos} = useContext(TodoContext)
   
   const submit = (formData) =>{
    createTodos(formData)
   }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <input placeholder="Título" type="text" {...register("title")} />
            <textarea placeholder="Conteúdo" {...register("content")}></textarea>
            <button type="submit">Criar Nota</button>
        </form>
    )
}