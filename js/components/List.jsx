var React = require('react');
var AppConstants = require('../constants/AppConstants.js');
var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');

var Url = React.createClass({
  getInitialState: function() {
    return {};
  },

  deleteUrl: function() {
    AppActions.delete(e.target.id);
  },

  openUrl() {
    chrome.tabs.create({url: e.target.href})
  },

  render: function() {
    var createItem = function(item) {
      return (
        <li key={item.id} id={item.id}>
          <img src={item.icon} width='16' height='16' border='0'/>
          <a href={item.url} className='title' onClick={this.openUrl}>{item.title}</a>
          <img className='delete' src='images/trash.png' width='16' height='16' border='0' onClick={this.deleteUrl}/>
        </li>
      );
    }

    return (
      <div>
        <ul id="bookmarks" className="tasks">{this.props.urls.map(createItem)}</ul>
      </div>
    );
  }
});

var List = React.createClass({
  getInitialState: function() {
    return AppStore.getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onAppUpdate);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onAppUpdate);
  },

  _onAppUpdate: function() {
    this.setState(AppStore.getAppState());
  },

  render: function() {
    return (
      <ul id="bookmarks" urls={this.state.urls.bookmarks}></ul>
    );
  }
});

module.exports = List;
