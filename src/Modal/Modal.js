import { Component } from "react";
import "./Modal.css";

export default class Modal extends Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <>
        <button onClick={() => this.setState({ isOpen: true })}>
          Open modal
        </button>

        {this.state.isOpen && (
          <div div className="modal">
            <div className="modal-body">
              <h1>Modal title</h1>
              <p>I am awesome modal!</p>
              <button onClick={() => this.setState({ isOpen: false })}>
                Close modal
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
