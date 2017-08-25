var React = require('react');
var AppConstants = require('../constants/AppConstants.js');
var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');
var List = require('../components/List.jsx');
var Toolbar = require('../components/Toolbar.jsx');

var App = React.createClass({
  getInitialState: function() {
    return AppStore.getAppState();
  },

  // Set up our listeners
  componentDidMount: function() {
    AppStore.addChangeListener(this._onAppChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onAppChange);
  },

  // Here we actually handle the different changes
  _onAppChange: function() {
    this.setState( AppStore.getAppState() );
  },

  // React render
  render: function() {
    return (
      <div>
        <List />
        <Toolbar />
      </div>
    );
  }
});

module.exports = App;
