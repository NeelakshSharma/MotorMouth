import React from "react";
import "./ChatScreen.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageReceived: []
    };
    this.handleText = this.handleText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = io("localhost:3001");
    this.socket.on("messageReceive", function(messageReceived) {
      addMessage(messageReceived);
    });
    const addMessage = messageReceived =>
      this.setState({
        messageReceived: [...this.state.messageReceived, messageReceived]
      });
  }

  handleText(e) {
    this.setState({
      message: e.target.value
    });
  }

  sendMessage() {
    this.setState({
      message: ""
    });
    this.socket.emit("message", {
      from: this.props.name,
      message: this.state.message
    });
  }

  render() {
    return (
      <div>
        <div>
          <ul>
              {this.state.messageReceived.map((e)=><li>{e.from}:{e.message}</li>)}
          </ul>
        </div>
        <TextField
          placeholder="Type here"
          className="ChatTextField"
          onChange={this.handleText}
          value={this.state.message}
        />
        <Button variant="contained" onClick={this.sendMessage}>
          Send
        </Button>
        <p>{this.state.messageReceived.length}</p>
      </div>
    );
  }
}

export default ChatScreen;
