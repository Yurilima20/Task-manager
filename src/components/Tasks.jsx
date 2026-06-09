/*import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSun from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react" */
import { CloudSun, MoonIcon, SunIcon } from "../assets/icons/index.js"
import { useGetTasks } from "../hooks/useGetTasks"
import Header from "./Header.jsx"
import TaskItem from "./TaskItem"
import TasksSeparator from "./TasksSeparator"

const Tasks = () => {
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((tasks) => tasks.time === "morning")
  const afternoonTasks = tasks?.filter((tasks) => tasks.time === "afternoon")
  const eveningTasks = tasks?.filter((tasks) => tasks.time === "evening")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas tarefas" title="Minhas Tarefas" />
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para este período.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} tasks={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSun />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para este período.
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem key={task.id} tasks={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para este período.
            </p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem key={task.id} tasks={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
