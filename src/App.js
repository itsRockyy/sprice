import React from "react";
import "./App.css";
import Loading from "./components/Loading";
import Feed from "./components/Feed";

class App extends React.Component {
  state = {
    loadingFeed: true,
    connected: false,
    stockMap: new Map(),
    justUpdatedStocks: []
  };

  componentDidMount = () => {
    const mediaNetSocket = new WebSocket("ws://stocks.mnet.website");
    mediaNetSocket.onopen = this.socketOpened;
    mediaNetSocket.onclose = this.socketClosed;

    let count = 10;
    mediaNetSocket.onmessage = message => {
      count--;
      if (count === 0) mediaNetSocket.close();
      const stockUpdates = JSON.parse(message.data);
      console.log("stockUpdates", stockUpdates);

      const stockMap = this.state.stockMap;
      const justUpdatedStocks = [];

      stockUpdates.forEach(item => {
        const symbol = item[0];
        justUpdatedStocks.push(symbol);
        const price = parseFloat(item[1]).toFixed(3);
        let time = new Date();
        let hours =
          time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
        let ampm = time.getHours() >= 12 ? " pm" : " am";

        time = `${hours.toString().padStart(2, "0")}:${time
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${time
          .getSeconds()
          .toString()
          .padStart(2, "0")} ${ampm}`;

        if (!this.state.stockMap.has(symbol)) {
          stockMap.set(symbol, {
            symbol,
            price: [price],
            time,
            date: Date.now()
          });
        } else {
          let oldStockEntry = stockMap.get(symbol);
          oldStockEntry.price.push(price);
          oldStockEntry.time = time;
          oldStockEntry.date = Date.now();
        }
      });
      this.setState({
        stockMap,
        justUpdatedStocks
      });
    };
  };

  render() {
    return (
      <div className="App">
        <main role="main" className="flex-shrink-0">
          <div className="container">
            <h1 className="mt-5">
              Live Stock Feed <i className="fas fa-chart-line" />
            </h1>
            <div style={{ position: "relative" }}>
              {this.state.connected ? (
                <span className="badge badge-success">Connected</span>
              ) : (
                <span className="badge badge-danger">Disconnected</span>
              )}
              <p className="lead">Watch the Stock prices update in Real Time</p>
              {this.state.loadingFeed ? (
                <Loading />
              ) : (
                <Feed
                  stockMap={this.state.stockMap}
                  justUpdatedStocks={this.state.justUpdatedStocks}
                />
              )}
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
