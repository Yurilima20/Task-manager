import { useState } from "react"
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
import TASKS from "../constants/tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TasksSeparator from "./TasksSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)
  const [addTaskDialisgOpen, setAddTaskDialogOpen] = useState(false)

  const morningTasks = tasks.filter((tasks) => tasks.time === "morning")
  const afternoonTasks = tasks.filter((tasks) => tasks.time === "afternoon")
  const eveningTasks = tasks.filter((tasks) => tasks.time === "evening")

  const handleDialogClose = () => {
    setAddTaskDialogOpen(false)
  }

  const handleTaskDeleteClick = (taskID) => {
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

  const handleAddTaskSubmit = (task) => {
    setTasks([...tasks, task])
    toast.success("Tarefa adicionada com sucesso!")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="semibold text-xs text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
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
              handleDialogClose
            } /* podemos passar funções assim tbm, mais trablhadas desenvolvidas lá em cima */
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSun />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
