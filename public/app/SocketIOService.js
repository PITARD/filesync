'use strict';
angular.module('FileSync')
  .factory('SocketIOService', ['io', '_', '$timeout', function(io, _, $timeout) {
    var socket = io();
    var _onFileChanged = _.noop;
    var _onVisibilityStatesChanged = _.noop;
    var _onMessageIn = _.noop;

    socket.on('connect', function() {
      console.log('connected');
      var login = prompt('Nickname?');
      socket.emit('viewer:new', login);


    });

    socket.on('message:in', function(msg){
      // console.log("message reçu du server : " + msg);
      $timeout(function() {
        _onMessageIn(msg);
      });
    });



    socket.on('file:changed', function(filename, timestamp, content) {
      $timeout(function() {
        _onFileChanged(filename, timestamp, content);
      });
    });

    socket.on('users:visibility-states', function(states) {
      $timeout(function() {
        _onVisibilityStatesChanged(states);
      });
    });

    socket.on('error:auth', function(err) {
      // @todo yeurk
      alert(err);
    });

    return {
      onViewersUpdated: function(f) {
        socket.on('viewers:updated', f);
      },

      onFileChanged: function(f) {
        _onFileChanged = f;
      },

      onVisibilityStatesChanged: function(f) {
        _onVisibilityStatesChanged = f;
      },
      newMessage: function(msg) {
         console.log("message au niveau de socketioservice : " + msg);
        socket.emit('message:out', msg);
      },
      onMessageIn : function(f) {
        socket.on('message:in', function(msg){
          $timeout(function() {
            f(msg);
          });
          });
      },
      userChangedState: function(state) {
        socket.emit('user-visibility:changed', state);
      }
    };
  }]);
