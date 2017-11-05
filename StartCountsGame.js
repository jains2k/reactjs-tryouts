// Write JavaScript here and press Ctrl+Enter to execute

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
	
  return (
    <div className="col-5">
    	{_.range(0, props.numberOfStars).map((i) => 
      	<i key={i} className="fa fa-star"/>
      )}
    </div>
  );
};

const Button = (props) => {
	let button;
  
  switch (props.isAnswerCorrect) {
  	case true:
      button = 
      	<button className="btn btn-success" onClick={props.acceptAnswer}>
        	<i className="fa fa-check"></i>
        </button>	
    	break
    case false:
    	button = 
      	<button className="btn btn-danger">
        	<i className="fa fa-times"></i>
        </button>	
      break;
    default: 
    	button = 
      		<button className="btn" 
          onClick={props.checkAnswer}
          disabled={props.selectedNumbers.length === 0}>=</button>
    	break;
  }
  
  return (
    <div className="col-2 text-center">
      {button}
      <br/><br/>
      <button className="btn btn-warning btn-sm" onClick={props.refresh}
      				disabled={props.redrawsRemaining === 0}>
      	<i className="fa fa-refresh"/>{' ' + props.redrawsRemaining}
      </button>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-5">
    	{props.selectedNumbers.map((number, i) => 
      	<span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
      )}
    </div>
  );
};

const Numbers = (props) => {
	const getClassName = (number) => {
  	if (props.usedNumbers.indexOf(number) >=0) {
    	return "used"
    }
  	if (props.selectedNumbers.indexOf(number) >=0) {
    	return "selected"
    }
  }
  return (
    <div className="card text-center">
      <div>
      	{Numbers.arrayOfNumbers.map((number, i) => 
        		<span key={i} className={getClassName(number)} 
            	onClick={() => props.selectNumber(number)}>
          				{number}</span>
        	)}
      </div>
    </div>
  );
};
Numbers.arrayOfNumbers = _.range(1,10);

const DoneFrame = (props) => {
	return (
  	<div className="text-center">
    	<h2>{props.doneStatus}</h2>
    </div>
  )
}

class Game extends React.Component {
	static generateRandomNumber = () => {
  	return 1 + Math.floor(Math.random()*9);
  }
	state = {
  	selectedNumbers: [],
    numberOfStars : Game.generateRandomNumber(),
    isAnswerCorrect: null,
    usedNumbers: [],
    redrawsRemaining: 3,
    doneStatus: null
  }
  
  clickNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
    	return;
    }
  	this.setState(prevState => ({
			isAnswerCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }))
  }
  
  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
			isAnswerCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	isAnswerCorrect: prevState.numberOfStars === 
      	prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers:[],
      isAnswerCorrect: null,
      numberOfStars : Game.generateRandomNumber(),
    }), this.updateDoneStatus)
  }
  
  refresh = () => {
  	this.setState(prevState => ({
      numberOfStars : Game.generateRandomNumber(),
      selectedNumbers:[],
      isAnswerCorrect: null,
      redrawsRemaining: prevState.redrawsRemaining - 1,
    }), this.updateDoneStatus)
  }
  
  noSolutionsRemaining = ({numberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1, 10).filter((number) => usedNumbers.indexOf(number) === -1)
    
    return !possibleCombinationSum(possibleNumber, numberOfStars);
  
  }
  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if (prevState.usedNumbers.length === 9) {
      	return {doneStatus: 'Done, nice!'}
      }
      if (prevState.redrawsRemainig === 0 && this.noSolutionsRemaining(prevState)) {
      	return {doneStatus: 'Game over!'}
      }
    })
  }
  render() {
  	const {
    	selectedNumbers, 
      numberOfStars, 
      isAnswerCorrect, 
      usedNumbers, 
      redrawsRemaining,
      doneStatus} = this.state
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
          				checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  refresh={this.refresh}
                  isAnswerCorrect={isAnswerCorrect}
                  redrawsRemaining={redrawsRemaining}/>
          <Answer selectedNumbers={selectedNumbers} 
          					unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        {doneStatus? 
        <DoneFrame doneStatus={doneStatus}/>:

        <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}
        	selectNumber={this.clickNumber}/>
        }
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
