import React, { Component } from "react";
import PokeBubbleText from "../../assets/utils/PokeBubbleTextIngredients";
import PokeBubbleTextDesktop from "../../assets/utils/PokeBubbleDesktop";
import "../../styles/IngredientsPage.css";
import chefPi from "../../assets/images/chefpi.png";
import SearchBar from "./SearchBar";
import { kitchen, kitchenDesk } from "./kitchen";
import { stock, stockDesk } from "../../assets/utils/stockIngredients";
import hoversound from "../../assets/audio/hovermecha.mp3";
import clicksound from "../../assets/audio/clicksound.mp3";
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

  handleDeskIngreChange = (option) => {
    let deskOption = option
      ? option.map((ingredientOption) => ingredientOption.value)
      : [];
    stockDesk.push(deskOption);
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
    this.setState({
      finalIngredients: stock.push(allIngredients),
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
  };

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
                <p className="IngrdntsPgTitleDesktop">Ingredients</p>
                <div
                  className="desktopSearchbar"
                  onMouseEnter={this.playHover}
                  onMouseLeave={this.stopHover}
                  onClick={this.playClick}
                >
                  {kitchenDesk.list.map((selection) => (
                    <SearchBar
                      list={selection.ingredients}
                      handleIngredientsChange={this.handleDeskIngreChange}
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
