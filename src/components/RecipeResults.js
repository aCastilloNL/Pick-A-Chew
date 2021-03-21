import React, { Component } from 'react';
import './RecipeResults.css';
import RecipeList from './RecipeList'
import PokeBubbleText from './PokeBubbleTextIngredients';
import chefPi from '../images/chefpi.png';

class Result extends Component {

    render() {
        
        return (
            
            <div className="results">
                <div className="results-header">
                    <img className="pikachu-results" src={chefPi} alt="pikachu" />
                        <div className="bubble-results">
                            <PokeBubbleText
                            stopCounter={171}
                            textData={["And voila!", "Swipe right on the picture to view more recipes.", "Tap on the name to show the instructions."]}
                            />
                        </div>
                </div>
                <>
                <RecipeList
                />
                </>
                <div className="pikaContHome">
                    <button className="result-button" onClick={this.props.toIngre}>I forgot something</button>
                </div>
            </div>
        )
    }
}

export default Result;