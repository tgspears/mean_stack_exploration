'use strict';

var angular = require('angular');

angular.module('todoListApp')
.controller('mainCtrl', function($scope, $log, $interval, dataService){
  
  dataService.getTodos(function(response){
    var todos = response.data.todos;  
      $scope.todos =  todos;
    });
  
  $scope.addTodo = function() {
    $scope.todos.unshift(
    	{
    		name: "Edit me!",
    		completed: false,
        priority: 0
    	}
    );
  };
  
})