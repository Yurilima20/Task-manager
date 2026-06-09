import PropTypes from "prop-types"
import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons/index.js"
import AddTaskDialog from "./AddTaskDialog.jsx"
import Button from "./Button.jsx"

function Header({ subtitle, title }) {
  const [addTaskDialisgOpen, setAddTaskDialogOpen] = useState(false)

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="semibold text-xs text-brand-primary">{subtitle}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
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
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  Children: PropTypes.node.isRequired,
}

export default Header
