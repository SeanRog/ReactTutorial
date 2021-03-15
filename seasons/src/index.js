import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      errorMessage: null
    };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {this.setState({
        lat: position.coords.latitude,
        errorMessage: null
      })},
      (err) => {
        this.setState({
          errorMessage: err.message,
          lat: null
        })
      }
    );
  }

	renderContent() {
		if(this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if(!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <Spinner message="Please accept location request" />;
	}

  render() {
    return (
			<div className="border red">
				{this.renderContent()}
			</div>
		)
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)

export default App;