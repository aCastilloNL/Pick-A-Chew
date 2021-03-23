import React, { Component } from "react";
import PokeBubbleText from "./PokeBubbleTextIngredients";
import PokeBubbleTextDesktop from "./PokeBubbleDesktop";
import "./IngredientsPage.css";
import chefPi from "../images/chefpi.png";
import SearchBar from "./SearchBar";
import { fridge } from "./fridge";
import { fridgeDesktop } from "./fridgeDesktop";
import { stock } from "./stockIngredients";
import { stockDesktop } from "./stockIngredientsDesktop";
import hoversound from "../audio/hovermecha.mp3";
import clicksound from '../audio/clicksound.mp3'
let magGlassTarget, i;

const hover = new Audio(hoversound);
const click = new Audio(clicksound);

class IngredientsPage extends Component {
  state = {
    showIngredients: true,
    ingredientsIngredients: [],
    ingredientsMeat: [],
    ingredientsFish: [],
    ingredientsVegetables: [],
    ingredientsFruits: [],
    ingredientsDairy: [],
    ingredientsGrains: [],
    ingredientsHerbs: [],
    ingredientsSauces: [],
    finalIngredients: [],
    finalIngredients2: [],
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
  }

  // Desktop version below
  getAllIngredients2 = () => {
    let allIngredients2 = [...this.state.ingredientsIngredients];
    this.setState({
      finalIngredients2: stockDesktop.push(allIngredients2),
    });
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
          <section className="ingredients-section">
            {fridge.list.map((fridgeChoice, index) => (
              <>
                <p className="categoryCss" key={`${index}-catName`}>{fridgeChoice.category}</p>
                <img
                  className="ingredients-image"
                  key={`${index}-catImg`}
                  src={fridgeChoice.image}
                  alt={fridgeChoice.category}
                />
                <div className="basic-multi-select">
                  <SearchBar
                    key={`${index}-ingred`}
                    list={fridgeChoice.ingredients}
                    handleIngredientsChange={this.handleIngredientsChange}
                    category={fridgeChoice.category}
                  />
                </div>
              </>
            ))}
          </section>
          {/* Desktop version starts here */}
          <section className="ingredients-desktop">
            <div className="desktopWrapper">
              {fridgeDesktop.list.map((fridgeChoice2, index) => (
                <>
                  <p className="IngrdntsPgTitleDesktop" key={`${index}-catNameDsk`}>
                    {fridgeChoice2.category}
                  </p>
                  <div
                    className="desktopSearchbar"
                    onMouseEnter={this.playHover}
                    onMouseLeave={this.stopHover}
                    onClick={this.playClick}
                  >
                    <SearchBar
                      list={fridgeChoice2.ingredients}
                      key={`${index}-ingredDsk`}
                      handleIngredientsChange={this.handleIngredientsChange}
                      category={fridgeChoice2.category}
                    />
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
              ))}
              <div className="container-homeDesktop">
                <button
                  className="deskIngredientsBtn"
                  onMouseEnter={this.playHover}
                  onMouseLeave={this.stopHover}
                  onClick={this.props.toLoading}
                >
                  <span onClick={this.getAllIngredients2}>
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
