import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import AddFishForm from "./AddFishForm"
import EditFishForm from "./EditFishForm"
import Login from "./Login"
import Logout from "./Logout"
import firebase from "firebase"
import base from "../base"

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    //On mount, ask Firebase to check out the user (if they are logged in)
    firebase.auth().onAuthStateChanged(user => {
      //If so, handle authentication with the stored user authData
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  anonAuthenticate = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(this.authHandler)
  }

  authHandler = async authData => {
    //The authData contains user data of the current sign-on
    //1. Look up the store in the Firebase DB
    const store = await base.fetch(this.props.storeId, { context: this })
    //2. Claim the store if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      })
    }
    //3. Reflect the current user in the Inventory component state
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    })
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    //Checking the credentials can yield three situations
    //1. If the user isn't logged in, prompt it
    if (!this.state.uid) {
      return (
        <Login
          authenticate={this.authenticate}
          anonAuthenticate={this.anonAuthenticate}
        />
      )
    }

    //2. If the user is not the owner, prevent inventory changes
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>
            Sorry you are not the owner! <br />
            Try <Link to="/">another store</Link>.
          </p>
          <Logout logout={this.logout} />
        </div>
      )
    }

    //3. If the user is the owner, render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <Logout logout={this.logout} />
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    )
  }
}

export default Inventory
