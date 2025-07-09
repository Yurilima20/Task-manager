const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-[#363e35]" {...props}>
      {props.children}
    </label>
  )
}

export default InputLabel
