import Rebase from "re-base"
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDZZ_-lTD5sdjK5Rdum8pDL_ETfkG1Ywf8",
  authDomain: "catch-of-the-day-leeandher.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-leeandher.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
