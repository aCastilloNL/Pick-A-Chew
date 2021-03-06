import React, { Component } from "react";
import "../../styles/HomePage.css";
import PokeBubbleText from "../../components/pokeBubble/PokebubbleTextHome";
import hoversound from "../../assets/aud/hovermecha.mp3";
import images from "../../assets/img";

const hover = new Audio(hoversound);
let counter = 0;

class HomePage extends Component {
  state = {
    mealTime: "",
    showHome: true,
  };

  mealTimes = ["dinner", "breakfast", "brunch", "supper", "lunch"];

  mealTimeGenerator = () => {
    let meal = this.mealTimes[counter];
    counter++;
    if (counter >= this.mealTimes.length) {
      counter = 0;
    }
    return meal;
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        mealTime: this.mealTimeGenerator(),
      });
    }, 2000);
  }

  componentWillUnmount() {
    this.interval = clearInterval(this.interval);
  }

  playHover = () => {
    hover.play();
  };
  stopHover = () => {
    hover.load();
  };

  render() {
    return (
      this.state.showHome && (
        <div className="home">
          <>
            <h1 className="homeTitle">Pick-a-Chew</h1>
            <h5 className="subTitleDesktop">
              <span>
                Don't know what to make for{" "}
                {!this.state.mealTime ? "lunch" : this.state.mealTime}?
              </span>
              <span>Whatever time of the day (or night) it is...</span>
              <span>We've got you covered.</span>
              <span>Let's find a cuisine.</span>
            </h5>
            <img id="deskPika" src={images.chefPika} alt="Chef Pikachu" />
          </>
          <div className="pikaContHome">
            <img className="pikachuHome" alt="pikachu" src={images.pikachuHome} />
            <div className="typerDiv">
              <PokeBubbleText
                stopCounter={200}
                textData={[
                  "Welcome to Pick-a-Chew!",
                  "The quick-stop app for all your recipe needs.",
                  "To get started, click on the button below.",
                ]}
              />
            </div>
          </div>
          {/* Button for Mobile */}
          <button className="homeButton" onClick={this.props.toIngredients}>
            Start
          </button>

          {/* Button for Desktop */}
          <button
            className="homeButtonDesktop"
            onMouseEnter={this.playHover}
            onMouseLeave={this.stopHover}
            onClick={this.props.toIngredients}
          >
            Discover
          </button>
        </div>
      )
    );
  }
}

export default HomePage;
