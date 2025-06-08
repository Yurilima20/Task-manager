import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
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
          <Button>
            <AddIcon /> Novas Tarefas
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Tasks
