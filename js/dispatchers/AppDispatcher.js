var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var AppDispatcher = assign(new Dispatcher(), {
  handleAction: function(action) {
    this.dispatch({
      source: 'ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
