'use strict';
angular.module('FileSync')
  .factory('ChatService', ['SocketIOService', function(SocketIOService) {
    var messages = [] ;

    SocketIOService.onMessageIn(function (msg) {
      console.log("message revenu au chatservice");
      messages.push(msg);
    });

    return {
      messages:messages,
      //newMessage:SocketIOService.newMessage (transparenceRéférentiel)
      newMessage: function(msg) {
         console.log("message reçu du controleur et dois etre envoyé au serveur :" + msg);
        SocketIOService.newMessage(msg);
      }
    };
      }]);
