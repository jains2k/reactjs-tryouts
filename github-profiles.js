const Card = (props) => {
	return (
  	<div>
      <img width="75" src={props.avatar_url}/>
      <div>
        <div>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  )
}

const CardList = (props) => {
	return (
  	<div>
      {props.cards.map((card) => <Card {...card}/>)}
    </div>
  )
}

class Form extends React.Component {
	state = {userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get("https://api.github.com/users/" + this.state.userName).then(
    	(resp) => {this.props.onSubmit(resp.data)})
    this.setState({userName: ""})
  }
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.userName}
          onChange={(event) => this.setState({userName:  event.target.value})}
          placeholder="Enter Github username"/>
        <button type="submit">Add</button>
      </form>
    )
  }
}

class App extends React.Component {
	state = {
		cards: []
  }
  
  addUser = (cardInfo) => {
  	this.setState((prevState) => ({
    	cards: prevState.cards.concat(cardInfo)
    }))
  }
	render() {
  	return (
    	<div>
        <Form onSubmit={this.addUser}/>
        <CardList cards={this.state.cards}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, mountNode)
