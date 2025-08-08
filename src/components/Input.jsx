import InputLabel from "./inputLabel"
import InputErrorMessage from "./InputErrorMessage"
import { forwardRef } from "react"

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <input
        className="rounded-lg border border-gray-300 px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9a9f9b]"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = "Input"

export default Input
