import React from "react";
import PropTypes from "prop-types";

const Logout = props => <button onClick={props.logout}>Log Out!</button>;

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Logout;
