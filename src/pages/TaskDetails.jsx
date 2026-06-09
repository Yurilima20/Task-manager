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
import { useDeleteTask } from "../hooks/data/use-delete-task.js"
import { useGetTask } from "../hooks/data/use-get-task.js"
import { useUpdateTask } from "../hooks/data/use-update-task.js"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const { mutate: updateTask } = useUpdateTask(taskId)
  const { mutate: deleteTask } = useDeleteTask(taskId)
  const { data: task } = useGetTask({
    taskId,
    onSuccess: reset,
  })
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

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa salva com sucesso!")
      },
      onError: () => {
        toast.error("Ocorreu um erro ao salvar a tarefa.")
      },
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!")
        navigate(-1)
      },
      onError: () => toast.error("Ocorreu um erro ao deletar a tarefa."),
    })
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
