import React, { Component } from 'react';
import HomePage from './components/homePage/HomePage'
import Ingredients from './components/ingredientsPage/IngredientsPage'
import Loading from './components/loading/Loading'
import clicksound from './audio/clicksound.mp3'
import './components/homePage/HomePage.css'

const click = new Audio(clicksound);

class App extends Component {
  state = {
    showHome: true,
    showIngredients: false,
    showLoading: false,
  }

  showHomeSection = () => {
    this.setState({
      showHome: true,
      showIngredients: false,
      showLoading: false,
    })
  }

  showIngredientsSection = () => {
    click.play()
    this.setState({
      showHome: false,
      showIngredients: true,
      showLoading: false,
    })
  }

  showLoadingSection = () => {
    click.play()
    this.setState({
      showHome: false,
      showIngredients: false,
      showLoading: true,
    })
  }

  render() {
    return (
      <div>
        {
          this.state.showHome &&
          <div className="home">
            <HomePage
              toIngredients={this.showIngredientsSection}
            />
          </div>
        }
        {
          this.state.showIngredients &&
          <div className="ingredients">
            <Ingredients
              toLoading={this.showLoadingSection}
            />
          </div>
        }
        {
          this.state.showLoading &&
          <div className="Loading">
            <Loading
              toIngredients={this.showIngredientsSection}
            />
          </div>
        }

      </div>
    );
  }
}
export default App;