import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  /* Component State */
  state = {
    fishes: {},
    order: {}
  };

  /* PropType Validation */
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  /* Lifecycle Methods */

  componentDidMount() {
    const { params } = this.props.match;
    //Sync state with Firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
    //Retrieve orders from local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) this.setState({ order: JSON.parse(localStorageRef) });
  }

  componentDidUpdate() {
    //Save order into local storage on update
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    //Remove firebase listener on unmount
    base.removeBinding(this.ref);
  }

  /* Custom Functions */

  //General Structure for Custom Functions
  //1. Take a copy of state
  //2. Perform processes
  //3. Set state to copy

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    //Make it null to mirror deletion to Firebase
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    //Delete it since order does not mirror to Firebase
    delete order[key];
    this.setState({ order });
  };

  //Render Function
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={() => this.addToOrder(key)}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
