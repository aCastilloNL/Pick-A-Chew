import React, {Component} from 'react';
import Result from './RecipeResults'
import PokeBubbleText from './PokeBubbleTextIngredients'
import './Loading.css'

class Loading extends Component {

    constructor() {
      super()
      this.state = {
        showLoading: true,
      }
      this.timerId = null
    }

    hidingTimer() {
      this.timerId = setTimeout(() => {
        this.setState({ showLoading: false })
      }, 3000)
    }

    componentDidMount() {
      this.hidingTimer()
    }

    render() {
      if (this.state.showLoading) {
        
        return (
          
            this.state.showLoading &&

            <>
              <div className="loading">
                <div className="bubble-loading">
                  <PokeBubbleText
                  stopCounter={14}
                  textData={["Now loading..."]}
                  />
                </div>
                </div>

                    {/* Desktop version */}
                    
                 {/* <div className="videoDesktop">
                  <video autoPlay muted
                    style={{
                    position : "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: "-1"
                  }}>
                    <source src={char} type='video/mp4' />
                  </video>
                </div> */}

          
              </>
        )
      }
      else {
        return (
          <>
            <Result
            toIngre={this.props.toIngredients}
             />
          </>
        )
      }
    }
  }
    export default Loading