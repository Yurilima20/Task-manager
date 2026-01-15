/*import CheckIconc from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader.svg?react"
import DatailIcon from "../assets/icons/details.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"*/
import {
  CheckIconc,
  DatailIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index.js"
import Button from "./Button"

const TaskItem = ({ tasks, handleTaskCheckboxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    if (tasks.status === "done") {
      return "bg-[#00ADB5]  text-[#00ADB5]"
    }

    if (tasks.status === "in_progress") {
      return "bg-[#FFAA04]  text-[#FFAA04]"
    }

    if (tasks.status === "not_started") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={tasks.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onClick={() => handleTaskCheckboxClick(tasks.id)}
          />
          {tasks.status === "done" && <CheckIconc />}
          {tasks.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>

        {tasks.title}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => handleDeleteClick(tasks.id)}>
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DatailIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
