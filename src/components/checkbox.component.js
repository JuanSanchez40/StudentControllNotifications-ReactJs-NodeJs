import React from "react";
class CheckboxComponent extends React.Component {

  render() {
    const checkboxList = this.props.checkboxList;
    return (
      <>
        {checkboxList.map((option) => (
          <div className="form-check" key={option.id} style={{marginBottom: '-15px'}}>
            <input
            className="form-check-input"
              type="checkbox"
              name="hobbies"
              id={option.id}
              value={option.id}
              checked={option.isChecked}
              onChange={(e) => this.props.onChange(e,option)}
            />
            <label className="form-check-label" htmlFor={option.id}>
              {option.name}
            </label>
          </div>
        ))}
      </>
    );
  }
}
export default CheckboxComponent;