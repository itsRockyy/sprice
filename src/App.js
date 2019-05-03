import React from "react";
import "./App.css";
import Loading from "./components/Loading";

class App extends React.Component {
  state = {
    loadingFeed: true,
    stockMap: new Map()
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loadingFeed: false
      });
    }, 3000);
  };

  render() {
    return (
      <div className="App">
        <main role="main" className="flex-shrink-0">
          <div className="container">
            <h1 className="mt-5">Live Stock Feed</h1>
            <p className="lead">Watch the Stock prices in Real Time</p>
            <div className="card mb-3">
              <div className="card-body">
                <p className="card-text">
                  {this.state.loadingFeed && <Loading />}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
