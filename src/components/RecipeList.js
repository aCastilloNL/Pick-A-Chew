import React, { Component } from 'react';
import { stock } from './stockIngredients';
import {stockDesktop} from './stockIngredientsDesktop'
import './RecipeList.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import scrollTop from '../images/scroll-top.png'
import scrollBottom from '../images/scroll-bottom.png'

class RecipeList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoaded: false,
      showRecipe: false,
      info: [],
      ingre: []

    }
  }

  displayRecipeBox = (id) => {
    console.log('this is the', id)
    fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}`)
      .then(result => {
        return result.json()
      })
      .then(res => {
        let recipeInfo = res.length ? res[0].steps : []
        console.log(recipeInfo)
        let recipeIngredients = recipeInfo.map(item => item.ingredients)
        console.log(recipeIngredients)
        console.log(recipeIngredients.flat().map(ingredient => ingredient.name));
        this.setState({
          showRecipe: true,
          info: recipeInfo
        })
      })
  }

  displayRecipeBox2 = (id) => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}`)
      .then(result2 => {
        return result2.json()
      })
      .then(jason2 => {
        let listIngredients = jason2.extendedIngredients
        this.setState({
          showIngredients: true,
          ingre: listIngredients
        })
      })
  }

  closeRecipeBox = () => {
    this.setState({
      showRecipe: false
    })
  }

  componentDidMount() {
    
    let stock2 = stock.join()
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}&ingredients=${stock2}&number=2`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        })
      })
      let stock3= stockDesktop.join()     /*desktop version*/
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}&ingredients=${stock3}&number=2`)
       .then(res => res.json())
      .then(json => {
         this.setState({
          isLoaded: true,
          items: json
        })
      })
  }


  render() {
    let { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Almost there...</div>;
    }
    else {
      return (

        <div className="recipeListContainer">
          <p className="resultTitleDesktop">Recipes</p>
          <Carousel >
            {items.map(item => (
              <div className="recipeContainer" data-id={item.id}>
                <img src={item.image} className="recipeImg" alt="images" />
                <p className="legend"><button className="ingredientsButton" onClick={() => this.displayRecipeBox2(item.id)}>
                <span className="span1" onClick={() => this.displayRecipeBox(item.id)}>{item.title}</span></button></p>
              </div>
            ))}
          </Carousel>

          {
            this.state.showRecipe &&
            
            <div className="recipeStepsBox">
              <img className="scrollTop" src={scrollTop} alt="scroll"/>
              {
                this.state.showIngredients &&
                <div className="ingredientsAmount">
                  <h3 className="steps">Ingredients</h3>
                  {this.state.ingre.map(indexer2 =>
                    <div className="ingredStepsList">
                        <ul>
                        <li>{indexer2.original}</li>
                        </ul>
                    </div>
                  )}
                </div>
              }

              <h3 className="steps">Step-by-Step Instructions</h3>
              {this.state.info.length ?
                this.state.info.map(indexer => (
                  <div>
                    <h3 className="stepInstruction"> Step {indexer.number} </h3>
                    <p className="stepStyle">{indexer.step}</p>
                  </div>
                ))
                : <div>
                    <h2>Sorry, recipe not available.</h2>
                  </div>
              }
              <button className="recipeButton" onClick={this.closeRecipeBox}>Back to Recipes</button>
              <img className="scrollBottom" src={scrollBottom} alt="scroll"/>
            </div>
          }

          {console.log(this.state.info)}
        </div>
      );
    }
  }
}

export default RecipeList;
