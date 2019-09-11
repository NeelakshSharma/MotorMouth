import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { styled } from '@material-ui/styles';
import TextField from "@material-ui/core/TextField";
import ChatScreen from "./ChatScreen";


class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      name: '',
      renderChat: false,
    }
    this.handleText = this.handleText.bind(this)
    this.submitName = this.submitName.bind(this)
  }

  MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    margin: '50px'
  });

  handleText(e){
    this.setState({
      name: e.target.value
    })
  }
  submitName()
  {

    if(this.state.name)
    {
      this.setState({
        renderChat: true,
      })
    }
  }

  render() {
    return (this.state.renderChat?<ChatScreen name = {this.state.name}/>:<div className = "EntryForm">
      <TextField
        id="standard-name"
        label="Name"
        onChange = {this.handleText}
      />
      <br/>
      <this.MyButton onClick = {this.submitName}>Set name</this.MyButton>
    </div>);
  }
}

export default App;
