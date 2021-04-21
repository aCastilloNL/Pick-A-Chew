import React, { Component } from "react";
import "../../styles/RecipeResults.css";
import RecipeList from "../../components/RecipeList";
import PokeBubbleText from "../../components/pokeBubble/PokeBubbleTextIngredients";
import images from "../../assets/img";

class Result extends Component {
  render() {
    return (
      <div className="results">
        <header className="results-header">
          <img className="pikachu-results" src={images.chefPika} alt="pikachu" />
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
        </header>
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
