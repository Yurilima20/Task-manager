import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSucess,
  onSubmitError,
}) => {
  const nodeRef = useRef()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleSaveClick = async (data) => {
    //chamar a aPI para adicionar a tarefa
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
      status: "not_started",
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return onSubmitError()
    }

    onSubmitSucess(task)
    handleClose()
    reset({
      title: "",
      time: "morning",
      description: "",
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }

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
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-1 mt-1 text-sm text-brand-text-gray">
                Insira as informações
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "Título é obrigatório",
                    validate: (value) => {
                      if (value.trim() === "") {
                        return "Título não pode ser vazio"
                      }
                      return true
                    },
                  })}
                />
                <TimeSelect
                  errorMessage={errors?.time?.message}
                  disabled={isSubmitting}
                  {...register("time", {
                    required: true,
                    validate: (value) => {
                      if (value.trim() === "") {
                        return "Horário não pode ser vazio"
                      }
                      return true
                    },
                  })}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "Descrição é obrigatória",
                    validate: (value) => {
                      if (value.trim() === "") {
                        return "Descrição não pode ser vazio"
                      }
                      return true
                    },
                  })}
                />
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
