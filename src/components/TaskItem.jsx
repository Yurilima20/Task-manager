/*import CheckIconc from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader.svg?react"
import DatailIcon from "../assets/icons/details.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"*/
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import {
  CheckIconc,
  DatailIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index.js"
import { useDeleteTask } from "../hooks/data/use-delete-task.js"
import { useUpdateTask } from "../hooks/data/use-update-task.js"
import Button from "./Button"

const TaskItem = ({ tasks }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(tasks.id)

  const { mutate } = useUpdateTask(tasks.id)

  const getStatusClasses = () => {
    if (tasks.status === "done") {
      return "bg-brand-primary  text-brand-primary"
    }

    if (tasks.status === "in_progress") {
      return "bg-brand-process  text-brand-process"
    }

    if (tasks.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
    }
  }

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa. Please try again.")
      },
    })
  }

  const getNewStatus = () => {
    if (tasks.status === "not_started") {
      return "in_progress"
    }

    if (tasks.status === "in_progress") {
      return "done"
    }
    return "not_started"
  }

  const handleCheckboxClick = () => {
    mutate(
      { status: getNewStatus() },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso!")
        },
        onError: () => {
          toast.error("Erro ao atualizar tarefa. Please try again.")
        },
      }
    )
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
            onChange={handleCheckboxClick}
          />
          {tasks.status === "done" && <CheckIconc />}
          {tasks.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>

        {tasks.title}
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${tasks.id}`} className="transition hover:opacity-75">
          <DatailIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  tasks: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["not_started", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleTaskCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
