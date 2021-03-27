import React, { Component } from "react";
import { stock, stockDesk } from "../stockIngredients";
import "./RecipeList.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoaded: false,
      showRecipe: false,
      showIngredients: false,
      steps: [],
      ingre: [],
    };
  }

  displayRecipeBox = (id) => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        // let recipeInfo = data.length ? data[0].steps : [];
        let recipeIngredients = data.extendedIngredients.map((number) => {
          return number.original;
        });
        let recipeSteps = data.analyzedInstructions.map((choice) => {
          return choice.steps.map((currEl) => currEl);
        });
        this.setState({
          showRecipe: true,
          steps: recipeSteps,
          showIngredients: true,
          ingre: recipeIngredients,
        });
      });
  };

  closeRecipeBox = () => {
    this.setState({
      showRecipe: false,
    });
  };

  componentDidMount() {
    let stockCompressed = stock.join();
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}&ingredients=${stockCompressed}&number=3`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
      let stockCompressedesk= stockDesk.join()
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_SPOONACULAR_KEY}&ingredients=${stockCompressedesk}&number=2`)
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
      return <div>Organizing Recipes...</div>;
    } else {
      return (
        <div className="recipeListContainer">
          <p className="resultTitleDesktop">Recipes</p>
          <h3 style={{ width: '100%', background: 'white', margin: '0'}}>Your choices:</h3>
          <p id="yourChoices" style={{ width: '100%', background: 'white'}}>{stock.toString().replace(/,/g, ", ")}</p> 
          <p id="yourChoicesDesk" style={{ width: '100%', background: 'white'}}>{stockDesk.toString().replace(/,/g, ", ")}</p>
          <Carousel showThumbs={false}>
            {items.map((item) => (
              <div className="recipeContainer" data-id={item.id}>
              <>
                <img src={item.image} className="recipeImg" alt="images" />
                <p className="legend">
                  <button
                    className="ingredientsButton"
                    onClick={() => this.displayRecipeBox(item.id)}
                  >
                    {item.title}
                  </button>
                </p>
                </>
              </div>
            ))}
          </Carousel>

          {this.state.showRecipe && (
            <div className="recipeStepsBox">
              {this.state.showIngredients && (
                <div className="ingredientsAmount">
                  <h3 className="steps">Ingredients</h3>
                  {this.state.ingre.map((ingredient) => (
                    <div className="ingredStepsList">
                      <ul>
                        <li>{ingredient}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="steps">Step-by-Step Instructions</h3>
              {this.state.steps.length ? (
                this.state.steps[0].map((currElement) => (
                  <div>
                    <h3 className="stepInstruction"> Step {currElement.number} </h3>
                    <p className="stepStyle">{currElement.step}</p>
                  </div>
                ))
              ) : (
                <div>
                  <h2>Sorry, this recipe is not available.</h2>
                </div>
              )}
              <button className="recipeButton" onClick={this.closeRecipeBox}>
                Back to Recipes
              </button>
            </div>
          )}
        </div>
      );
    }
  }
}

export default RecipeList;
