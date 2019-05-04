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

    mediaNetSocket.onmessage = message => {
      const stockUpdates = JSON.parse(message.data);
      // console.log("stockUpdates", stockUpdates);

      const stockMap = this.state.stockMap;
      const justUpdatedStocks = [];

      stockUpdates.forEach(item => {
        const symbol = item[0];
        justUpdatedStocks.push(symbol);
        const price = parseFloat(item[1]).toFixed(3);
        let time = new Date();
        let hours =
          time.getHours() >= 12 ? time.getHours() - 12 : time.getHours();
        let ampm = time.getHours() >= 12 ? "P.M." : "A.M.";

        time = `${hours}:${time.getMinutes()} ${ampm}`;

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

      // console.log("justUpdatedStocks", justUpdatedStocks);

      this.setState({
        stockMap,
        justUpdatedStocks
      });
    };

    setTimeout(() => {
      mediaNetSocket.close();
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
                  <Feed
                    stockMap={this.state.stockMap}
                    justUpdatedStocks={this.state.justUpdatedStocks}
                  />
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
