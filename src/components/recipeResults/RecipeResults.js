import React, { Component } from "react";
import "../../styles/RecipeResults.css";
import RecipeList from "./RecipeList";
import PokeBubbleText from "../../assets/utils/PokeBubbleTextIngredients";
import chefPi from "../../assets/images/chefpi.png";

class Result extends Component {
  render() {
    return (
      <div className="results">
        <div className="results-header">
          <img className="pikachu-results" src={chefPi} alt="pikachu" />
          <div className="bubble-results">
            <PokeBubbleText
              stopCounter={171}
              textData={[
                "And voila!",
                "Swipe right on the picture to view more recipes.",
                "Tap on the name to show the instructions.",
              ]}
            />
          </div>
        </div>
        <>
          <RecipeList />
        </>
          <button className="resultsButton" onClick={this.props.toIngre}>
            I forgot something
          </button>
      </div>
    );
  }
}

export default Result;
