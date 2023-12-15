
//Custom form field component. Use destructured props to set field.
const FormRow = ({ labelText, name, type, value, onChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input type={type} name={name} id={name} className="form-input" value={value} onChange={onChange} />
        </div>
    )
}

export default FormRow