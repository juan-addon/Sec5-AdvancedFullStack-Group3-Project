import React from "react";
import { Form } from "react-bootstrap";

function format(num) {
  return num != null ? num.toString() : "";
}

function unformat(input) {
  const val = parseInt(input, 10);
  return Number.isNaN(val) ? null : val;
}

export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value));
  }

  render() {
    const { value } = this.state;
    const { tag = "input", ...props } = this.props;
    return (
      <Form.Control
        {...props}
        as={tag}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
