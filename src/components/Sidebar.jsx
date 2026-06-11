/*import HomeIcon from "../assets/icons/home.svg?react"
import TaskIcon from "../assets/icons/tasks.svg?react"*/
import { HomeIcon, TasksIcon } from "../assets/icons/index.js"
import SidebarButton from "./SidebarButton"

const Sidebar = () => {
  return (
    <div className="h-screen w-72 min-w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Um simples {""}
          <span className="text-brand-primary">organizador de tarefas</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton to="/" className="text-brand-primary">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton to="/tasks" className="text-brand-primary">
          <TasksIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
