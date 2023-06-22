import React from 'react';
import Form from 'react-bootstrap/Form';

function displayFormat(date) {
  return date != null ? date.toISOString().split('T')[0] : '';
}

function editFormat(date) {
  return date != null ? date.toISOString().substr(0, 10) : '';
}

function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const { value, valid: oldValid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat(value);
    const valid = value === '' || dateValue != null;
    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) onChange(e, dateValue);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidInputs = { ...prevState.invalidInputs, [name]: !valid };
      if (valid) delete invalidInputs[name];
      return { invalidInputs };
    });
  }

  render() {
    const { valid, focused, value } = this.state;
    const { value: originalValue, name } = this.props;
    const className = !valid && !focused ? 'invalid' : null;
    const displayValue = focused || !valid ? value : displayFormat(originalValue);

    return (
      <Form.Control
        {...this.props}
        type="text"
        size={20}
        name={name}
        className={className}
        value={displayValue}
        placeholder={focused ? 'yyyy-mm-dd' : 'Enter date'}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
