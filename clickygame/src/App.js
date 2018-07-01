import React, { Component } from "react";
import Card from "./components/card";
import Wrapper from "./components/wrapper";
import Score from "./components/score";
import sims from "./cards.json";
import "./App.css";

class App extends Component {
  state = {
    sims,
    clickedSimpsIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  shuffleScoreCard = id => {
    let clickedSimpsIds = this.state.clickedSimpsIds;

    if(clickedSimpsIds.includes(id)){
      this.setState({ clickedSimpsIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedSimpsIds.push(id)

      if(clickedSimpsIds.length === 8){
        this.setState({score: 8, status: "You Won! Great Job, Smartie! Click to play again!", clickedSimpsIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ sims, clickedSimpsIds, score: clickedSimpsIds.length, status: " " });

      for (let i = sims.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sims[i], sims[j]] = [sims[j], sims[i]];
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clickster</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.sims.map(Simps => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={Simps.id}
              key={Simps.id}
              image={Simps.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>Pacho Salazar</p>
        </footer>
    </div>
    );
  }
}

export default App;