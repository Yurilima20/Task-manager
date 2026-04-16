import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import {
  BackIcon,
  LoaderIcon,
  TrashIcon,
  Vector,
} from "../assets/icons/index.js"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import Sidebar from "../components/Sidebar.jsx"
import TimeSelect from "../components/TimeSelect.jsx"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
      reset(data)
      console.log(data)
    }

    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      }),
    })
    if (!response.ok) {
      return toast.error("Erro ao salvar tarefa. Please try again.")
    }
    const newTask = await response.json()
    setTask(newTask)
    toast.success("Tarefa salva com sucesso!")
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      return toast.error("Erro ao remover tarefa. Please try again.")
    }
    toast.success("Tarefa removida com sucesso!")
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <BackIcon />
            </button>
            <div className="flex items-center gap-1 text-2xl">
              <Link className="text-brand-text- cursor-pointer" to="/">
                Minhas tarefas
              </Link>
              <Vector className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* parte da direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* dados da tarefa */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "Título é obrigatório",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Título não pode ser vazio"
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                {...register("time", {
                  required: "Tempo é obrigatório",
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "Descrição é obrigatória",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Descrição não pode ser vazia"
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          {/* botões de cancelar e salvar */}
          <div className="flex w-full justify-end gap-3 pt-4">
            <Button size="large" color="secondary" onClick={handleBackClick}>
              Cancelar
            </Button>
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default TaskDetailsPage
