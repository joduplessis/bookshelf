var React = require('react');
var AppConstants = require('../constants/AppConstants.js');
var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');

var Toolbar = React.createClass({
  handleAddUrl: function() {
    chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    }, function(tabs) {
      AppActions.add({
        id: new Date().getTime(),
        icon: tabs[0].favIconUrl,
        url: tabs[0].url,
        title: tabs[0].title,
      });
    });
  },

  handleClearUrl: function() {
    AppActions.clear();
  },

  render: function() {
    return(
      <div>
        <div id="add" href="javascript:void(0)" onClick={this.handleAddUrl}>
          <img src="images/add.png" border="0" width="24" height="24" id="add_image"/>
          <span id="add_text">Add this page to your shelf</span>
        </div>

        <div id="clear" href="javascript:void(0)" onClick={this.handleClearUrl}>
          <img src="images/delete.png" border="0" width="24" height="24" id="clear_image"/>
          <span id="clear_text">Clear your shelf</span>
        </div>
      </div>
    );
  }
});

module.exports = Toolbar;
