import React from 'react';
import { Form } from 'react-bootstrap';

function format(text) {
    return text != null ? text : "";
}

function unformat(text) {
    return text.trim().length === 0 ? null : text;
}

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: format(props.value) };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onBlur(e) {
        const { onChange } = this.props;
        const { value } = this.state;
        onChange(e, unformat(value));
    }

    render() {
        const { value } = this.state;
        const { tag = 'input', ...props } = this.props;
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
