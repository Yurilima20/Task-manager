import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { BackIcon, TrashIcon, Vector } from "../assets/icons/index.js"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import Sidebar from "../components/Sidebar.jsx"
import TimeSelect from "../components/TimeSelect.jsx"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
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
      console.log(data)
    }

    fetchTask()
  }, [taskId])

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
              <span
                className="text-brand-text- cursor-pointer"
                onClick={handleBackClick}
              >
                Minhas tarefas
              </span>
              <Vector className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* parte da direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input id="title" label="Título" value={task?.title} />{" "}
          </div>
          <div>
            <TimeSelect value={task?.time} />{" "}
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />{" "}
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TaskDetailsPage
