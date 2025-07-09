import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import "./AddTaskDialog.css"
import Button from "./Button"
import Input from "./Input"
import { useRef } from "react"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            {/* Dialog content */}
            <div className="rounded-xl bg-white p-5 text-center">
              <h2 className="textt-[#35383E] text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="mb-1 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                />
                <TimeSelect />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                />
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button size="large" className="w-full">
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
