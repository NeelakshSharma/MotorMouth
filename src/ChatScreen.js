import React from "react";
import "./ChatScreen.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import io from "socket.io-client";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageReceived: [],
      typing: "",
      count: 1
    };
    this.handleText = this.handleText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = io("localhost:3001");
    this.socket.on("messageReceive", function(messageReceived) {
      addMessage(messageReceived);
    });
    this.socket.on("typing", function(name) {
      setName(name);
    });
    this.socket.on("count", function(count) {
      setCount(count);
    });
    const setName = name =>
      this.setState({
        typing: name
      });
    const setCount = count =>
      this.setState({
        count: count
      });
    const addMessage = messageReceived =>
      this.setState({
        messageReceived: [...this.state.messageReceived, messageReceived],
        typing: ""
      });
  }

  handleText(e) {
    this.setState({
      message: e.target.value
    });
    this.socket.emit("typing", this.props.name);
  }

  sendMessage() {
    if (this.state.message) {
      this.socket.emit("message", {
        from: this.props.name,
        message: this.state.message
      });
    }
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <div>
        <div>
          {<p>{this.state.count - 1} sitting online</p>}
          <br />
          <ul className="List">
            {this.state.messageReceived.map(e => (
              <li>
                <Card>
                  <CardContent>
                    <Avatar>{e.from.substring(0, 1)}</Avatar>
                    <Typography color="textSecondary" gutterBottom>
                      {e.from}
                    </Typography>
                    <Typography>{e.message}</Typography>
                  </CardContent>
                </Card>
                <Divider />
              </li>
            ))}
          </ul>
          {this.state.typing ? <p>{this.state.typing} is typing..</p> : <p></p>}
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
      </div>
    );
  }
}

export default ChatScreen;
