import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./inputLabel"

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="rounded-lg border border-gray-300 px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9a9f9b]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {props.errorMessage && (
        <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
      )}
    </div>
  )
}

export default TimeSelect
