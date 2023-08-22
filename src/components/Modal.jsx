import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class CustomModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Task Item</ModalHeader>
        <ModalBody>
          <form>
            {/*  TITLE */}
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
            </FormGroup>

            {/*  DESCRIPTION */}
            <FormGroup>
              <Label for="description">Title</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Task description"
              />
            </FormGroup>

            {/*  Completed */}
            <FormGroup check>
              <Label for="completed">Title</Label>
              <Input
                type="checkbox"
                name="completed"
                checked={this.state.activeItem.completed}
                onChange={this.handleChange}
              />
            </FormGroup>
          </form>
        </ModalBody>
        <modalFooter>
          <button
            className="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Saved
          </button>
        </modalFooter>
      </Modal>
    );
  }
}

export default Modal;
