import React, { Component } from "react";
import PokeBubbleText from "../PokeBubbleTextIngredients";
import PokeBubbleTextDesktop from "../PokeBubbleDesktop";
import "./IngredientsPage.css";
import chefPi from "../../images/chefpi.png";
import SearchBar from "./SearchBar";
import { kitchen, kitchenDesk } from "./kitchen";
import { stock, stockDesk } from "../stockIngredients";
import hoversound from "../../audio/hovermecha.mp3";
import clicksound from '../../audio/clicksound.mp3'
let magGlassTarget, i;

const hover = new Audio(hoversound);
const click = new Audio(clicksound);

class IngredientsPage extends Component {
  state = {
    showIngredients: true,
    ingredientsMeat: [],
    ingredientsFish: [],
    ingredientsVegetables: [],
    ingredientsFruits: [],
    ingredientsDairy: [],
    ingredientsGrains: [],
    ingredientsHerbs: [],
    ingredientsSauces: [],
    finalIngredients: [],
    finalIngreDesk: [],
  };
  searchBarGlass = () => {
    magGlassTarget = document.querySelectorAll(".select__dropdown-indicator");
    for (i = 0; i < magGlassTarget.length; i++) {
      magGlassTarget[i].firstChild.remove();
      magGlassTarget[i].style.padding = "15px";
      magGlassTarget[i].style.backgroundImage =
        "url('https://friconix.com/png/fi-xnsuhm-search.png')";
      magGlassTarget[i].style.backgroundSize = "contain";
    }
  };
  componentDidMount() {
    this.searchBarGlass();
  }
  handleIngredientsChange = (option, category) => {
    let optionToString = option
      ? option.map((ingredientsOption) => ingredientsOption.value)
      : [];
    this.setState({
      ["ingredients" + category]: optionToString,
    });
  };
  getAllIngredients = () => {
    let allIngredients = [
      ...this.state.ingredientsMeat,
      ...this.state.ingredientsFish,
      ...this.state.ingredientsVegetables,
      ...this.state.ingredientsFruits,
      ...this.state.ingredientsDairy,
      ...this.state.ingredientsGrains,
      ...this.state.ingredientsHerbs,
      ...this.state.ingredientsSauces,
    ];
    console.log(allIngredients)
    this.setState({
      finalIngredients: stock.push(allIngredients),
      finalIngreDesk: stockDesk.push(allIngredients),
    });
  };
  playHover = () => {
    hover.play();
  };
  stopHover = () => {
    hover.load();
  };
  playClick = () => {
    click.play();
  }

  render() {
    return (
      this.state.showIngredients && (
        <div className="ingredients">
          <div className="ingredients-header">
            <img className="pikachu-ingredients" src={chefPi} alt="pikachu" />
            <div className="bubble-ingredients">
              <PokeBubbleText
                stopCounter={122}
                textData={[
                  "Which foods are in your kitchen?",
                  "Select your ingredients in the categories below.",
                ]}
              />
            </div>
          </div>
          {/*Mobile version*/}
          <section className="ingredients-section">
            {kitchen.list.map((kitchenChoice) => (
              <>
                <p className="categoryCss">{kitchenChoice.category}</p>
                <img
                  className="ingredients-image"
                  src={kitchenChoice.image}
                  alt={kitchenChoice.category}
                />
                <div className="basic-multi-select">
                  <SearchBar
                    list={kitchenChoice.ingredients}
                    handleIngredientsChange={this.handleIngredientsChange}
                    category={kitchenChoice.category}
                  />
                </div>
              </>
            ))}
          </section>
          {/* Desktop version starts here */}
          <section className="ingredients-desktop">
            <div className="desktopWrapper">
                <>
                  <p className="IngrdntsPgTitleDesktop">
                    Ingredients
                  </p>
                  <div
                    className="desktopSearchbar"
                    onMouseEnter={this.playHover}
                    onMouseLeave={this.stopHover}
                    onClick={this.playClick}
                  >
                    {kitchenDesk.list.map((selection) => (
                    <SearchBar
                      list={selection.ingredients}
                      handleIngredientsChange={this.handleIngredientsChange}
                      category={selection.category}
                    />
                    ))}
                  </div>
                  <div className="bubbleTextDesktop">
                    <PokeBubbleTextDesktop
                      stopCounter={145}
                      textData={[
                        "Which foods are in your kitchen?",
                        "Search all the ingredients above and click on the button below.",
                      ]}
                    />
                  </div>
                </>
              <div className="container-homeDesktop">
                <button
                  className="deskIngredientsBtn"
                  onMouseEnter={this.playHover}
                  onMouseLeave={this.stopHover}
                  onClick={this.props.toLoading}
                >
                  <span
                  className="deskIngrdntsBtnSpan" 
                  onClick={this.getAllIngredients}
                  >
                    Recipes
                  </span>
                </button>
              </div>
            </div>
          </section>
          {/* Desktop version stops here */}
          <div className="pikaContHome">
            <button className="ingredientsBtn" onClick={this.props.toLoading}>
              <span
                className="ingrdntsBtnSpan"
                onClick={this.getAllIngredients}
              >
                Recipes
              </span>
            </button>
          </div>
        </div>
      )
    );
  }
}
export default IngredientsPage;
