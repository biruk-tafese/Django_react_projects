import React, { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      todoList: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((res) => this.setState({ todoList: res.data })) 
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
    }
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`, item)
      .then((res) => this.refreshList());
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  createItem = () => {
    const item = {
      title: "",
      description: "",
      completed: false,
    };
    this.setState({ activeItem: item, modal: true }); // Open the modal
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted, todoList } = this.state;
    const filteredItems = todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between"
      >
        <span
          className={`todo-title mr-2 ${
            item.completed ? "completed-todo" : ""
          }`}
          title={item.title}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-info mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">
          Task Manager
        </h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-warning" onClick={this.createItem}>
                  Add tasks
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-4 mb-2 bg-info text-white text-center text-white">
          Copyright 2023 &copy; All Rights Reserved
        </footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
