import React, { Component } from "react";

export class Test extends Component {
  state = { is_alive: false };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  handleCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
    console.log("checked");
  };

  onSubmit = e => {
    e.preventDefault();
    const { is_alive } = this.state;
    const stream = { is_alive };
    console.log(stream);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="checkbox"
            checked={this.state.is_alive}
            onChange={this.handleCheck}
            name="is_alive"
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Test;

///////////////////////////////

// onChange={this.handleCheck}
//             name="is_alive"

//   {/* father is alive */}
//   <div className="col-xl-2">
//   <Form.Item name="father_alive">
//     {getFieldDecorator("father_alive", {
//       valuePropName: "checked",
//       initialValue: true
//     })(
//       <Checkbox
//       onChange={this.handleCheck}
//       name="father_alive">
//         Father is alive
//       </Checkbox>
//     )}
//   </Form.Item>
// </div>