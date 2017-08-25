var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');

var AppActions = {
  delete: function(item) {
    AppDispatcher.handleAction({
      actionType: AppConstants.DELETE,
      item: item
    });
  },

  add: function(item) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD,
      item: item
    });
  },

  clear: function() {
    AppDispatcher.handleAction({
      actionType: AppConstants.CLEAR
    });
  }
};

module.exports = AppActions;
