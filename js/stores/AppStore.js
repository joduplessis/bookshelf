var AppDispatcher = require('../dispatchers/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('react/lib/Object.assign');
var StreamActions = require('../actions/AppActions.js');
var AppStore = require('../stores/AppStore.js');

var CHANGE_EVENT = 'change';
var urls = {'bookmarks': []};

var AppStore = assign({}, EventEmitter.prototype, {
  getAppState: function() {
    chrome.storage.local.get("bookmarks", function(items) {
      // Set the badge count
      chrome.browserAction.setBadgeText({text: ""+items.length});

      if (items.length!=0) {
        // Assign that to our bookmarks global list
        urls.bookmarks = items;

        // Emit the change
        AppStore.emitChange();

        // return the list
        return urls;
      }
    });

    return urls;
  },

  updateBadgeCount: function() {
    chrome.browserAction.setBadgeText({text: ""+urls.bookmarks.split(splitItem).length});
  },

  persistData: function(str) {
    chrome.storage.local.set(urls, function() {
      AppStore.getAppState();
    });
  },

  deleteUrl: function(id) {
    for (var u=0; u<urls.length; u++) {
      if (id==urls[u].id) {
        urls.splice(u, 1);

        // Emit the change of the delete
        AppStore.emitChange();
      }
    }
  },

  // These are all the boilerplate Flux event emitter callback functions
  emitChange: function() { this.emit(CHANGE_EVENT); },
  addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },
  removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

module.exports = AppStore;

AppDispatcher.register(function(payload) {
  switch (payload.action.actionType) {
    case AppConstants.ADD:
      urls.bookmarks.push(payload.action.item);
      AppStore.emitChange();
      break;

    case AppConstants.DELETE:
      AppStore.deleteUrl(payload.action.item.id);
      AppStore.emitChange();
      break;

    case AppConstants.CLEAR:
      urls = [];
      AppStore.emitChange();
      break;
  }
  return true;
});
