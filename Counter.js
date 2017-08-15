// write code here and press Ctrl+Enter to execute

class Button extends React.Component {
  
  handleClick = () => {
		this.props.onClick(this.props.incrementValue)  
  }
  render() {
  	return (
    	<button onClick={this.handleClick}>
        +{this.props.incrementValue}
      </button>
    );
  }
}

class App extends React.Component {
	state = {counter: 0}
  
  increment = (incrementValue) => {
  	this.setState((prevState) => ({
      	counter: prevState.counter + incrementValue
    }))
  }

	render() {
  	return (
    	<div>
      	<Button incrementValue={1} onClick={this.increment}/>
      	<Button incrementValue={5} onClick={this.increment}/>
      	<Button incrementValue={10} onClick={this.increment}/>
      	<Button incrementValue={50} onClick={this.increment}/>
      	<Button incrementValue={100} onClick={this.increment}/>
        <Result result={this.state.counter}/>
      </div>
    );
  }
}

const Result = (props) => {
	return (
		<div>{props.result}</div>
  );
};

ReactDOM.render(<App />, mountNode);
