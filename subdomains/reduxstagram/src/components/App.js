import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import Main from './Main'

const mapStateToProps = s => {
  return { posts: s.posts, comments: s.comments }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

console.log(App)

export default App
