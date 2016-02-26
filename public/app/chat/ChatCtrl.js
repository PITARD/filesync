'use strict';
angular
  .module('FileSync')
  .controller('ChatCtrl', ['$scope', 'ChatService', function($scope, ChatService) {
    this.messages = ChatService.messages;

    $scope.submit = function(){
      console.log("msg saisi : " + $scope.inputMessage);
      // $scope.inputMessage;
      //$scope.messages.push($scope.inputMessage);
      if (!$scope.inputMessage.trim() === " ") {
        return;
      }
      ChatService.newMessage($scope.inputMessage);
      $scope.inputMessage = '' ;

    };

    function onMessageIn(msg) {
      // console.log("message revenu au controleur :" + msg);
      this.messages.push(msg);

      $scope.$apply();
      document.getElementById('tchatUl').scrollTop = document.getElementById('tchatUl').scrollHeight;
      $('.ouvrir').css('background', 'green');
    }

    //ChatService.onMessageIn(onMessageIn.bind(this));
  }]);
