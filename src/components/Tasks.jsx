import { useEffect, useState } from "react"
import { toast } from "sonner"

/*import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSun from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react" */
import {
  AddIcon,
  CloudSun,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons/index.js"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TasksSeparator from "./TasksSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialisgOpen, setAddTaskDialogOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const tasks = await response.json()
      setTasks(tasks)
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((tasks) => tasks.time === "morning")
  const afternoonTasks = tasks.filter((tasks) => tasks.time === "afternoon")
  const eveningTasks = tasks.filter((tasks) => tasks.time === "evening")

  const onDeleteTaskSucess = (taskID) => {
    const newTasks = tasks.filter((task) => task.id !== taskID)
    setTasks(newTasks)
    toast.success("Tarefa removida com sucesso!")
  }

  const handleTaskCheckboxClick = (taskID) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskID) {
        return task
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso!")
        return { ...task, status: "in_progress" }
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!")
        return { ...task, status: "done" }
      }

      if (task.status === "done") {
        toast.info("Tarefa reiniciada com sucesso!")
        return { ...task, status: "not_started" }
      }

      return task
    })
    setTasks(newTasks)
  }

  const onTaskSubmitSucess = (task) => {
    setTasks([...tasks, task])
    toast.success("Tarefa adicionada com sucesso!")
  }

  const onTaskSubmitError = () => {
    toast.error("Erro ao adicionar tarefa. Please try again.")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="semibold text-xs text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            <TrashIcon />
            Limpar Tarefas
          </Button>

          <Button
            onClick={
              () =>
                setAddTaskDialogOpen(
                  true
                ) /* podemos passar funções assim , ideal para funções pequenas */
            }
          >
            <AddIcon /> Novas Tarefas
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialisgOpen}
            handleClose={
              () =>
                setAddTaskDialogOpen(
                  false
                ) /* podemos passar funções assim , ideal para funções pequenas */
            } /* podemos passar funções assim tbm, mais trablhadas desenvolvidas lá em cima */
            onSubmitSucess={onTaskSubmitSucess}
            onSubmitError={onTaskSubmitError}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para este período.
            </p>
          )}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              onDeleteSucess={onDeleteTaskSucess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSun />} />
          {afternoonTasks.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para este período.
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              onDeleteSucess={onDeleteTaskSucess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para este período.
            </p>
          )}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              onDeleteSucess={onDeleteTaskSucess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
