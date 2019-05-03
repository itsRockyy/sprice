import React from "react";
import "./App.css";
import Loading from "./components/Loading";
import Feed from "./components/Feed";

class App extends React.Component {
  state = {
    loadingFeed: true,
    connected: false,
    stockMap: new Map(),
    stocksArray: []
  };

  componentDidMount = () => {
    const exampleSocket = new WebSocket("ws://stocks.mnet.website");
    exampleSocket.onopen = this.socketOpened;
    exampleSocket.onclose = this.socketClosed;

    exampleSocket.onmessage = message => {
      let stockUpdates = JSON.parse(message.data);
      stockUpdates = stockUpdates.map(element => {
        return {
          ticker: element[0],
          price: parseFloat(element[1]).toFixed(4),
          date: Date.now()
        };
      });

      let map = new Map();
      stockUpdates.forEach(element => {
        map.set(element.ticker, {
          symbol: element.ticker,
          price: element.price,
          date: element.date
        });
      });

      this.setState({
        stockMap: map
      });

      // console.log(this.state);
      let updatedStockArray = [];
      this.state.stockMap.forEach(value => updatedStockArray.push(value));
      // console.log(b);
      this.setState({
        stocksArray: [...updatedStockArray]
      });
    };

    setTimeout(() => {
      exampleSocket.close();
    }, 5000);
  };

  render() {
    return (
      <div className="App">
        <main role="main" className="flex-shrink-0">
          <div className="container">
            <h1 className="mt-5">Live Stock Feed</h1>

            {this.state.connected ? (
              <span className="badge badge-success">Connected</span>
            ) : (
              <span className="badge badge-danger">Disconnected</span>
            )}
            <p className="lead">Watch the Stock prices update in Real Time</p>
            <div className="card mb-3">
              <div className="card-body">
                {this.state.loadingFeed ? (
                  <Loading />
                ) : (
                  <Feed stocks={this.state.stocksArray} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  socketOpened = () => {
    console.log("WebSocket connection is open now.");
    this.setState({
      loadingFeed: false,
      connected: true
    });
  };

  socketClosed = () => {
    console.log("WebSocket connection is Closed.");
    this.setState({
      connected: false
    });
  };
}

export default App;
