import { createPortal } from "react-dom"

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
      {/* Dialog content */}
      <div className="rounded-xl p-5 text-center">
        <h2 className="textt-[#35383E] text-xl font-semibold">Nova Tarefa</h2>
        <p className="mt-1 text-sm text-[#9A9C9F]">Insira as informações</p>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
