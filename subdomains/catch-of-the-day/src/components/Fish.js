import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      status: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string
    }).isRequired,
    addToOrder: PropTypes.func.isRequired
  };

  render() {
    const { status, image, name, price, desc } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={this.props.addToOrder} disabled={!isAvailable}>
          {isAvailable ? "Add To Cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
