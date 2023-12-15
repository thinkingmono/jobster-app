
//Custom form field component. Use destructured props to set select field.
const FormRowSelect = ({ labelText, name, value, onChange, list }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <select name={name} id={name} value={value} onChange={onChange} className="form-select">
                {/*Show select options through map*/}
                {list.map((itemValue, index) => {
                    return (
                        <option key={index} value={itemValue}>{itemValue}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormRowSelect