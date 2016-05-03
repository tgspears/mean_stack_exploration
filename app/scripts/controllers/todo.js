'use strict';

angular.module('todoListApp')
.controller('todoCtrl', function($scope, dataService) {
  $scope.deleteTodo = function(todo, index) {
    dataService.deleteTodo(todo).then(function(){
      $scope.todos.splice(index, 1);
    });
  };
  
  $scope.saveTodos = function() {
    var filteredTodos = $scope.todos.filter(function(todo){
      if(todo.edited) {
        return todo;
      };
    });
    return dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());
  };

  $scope.priorityChange = function(todo, direction){
    return dataService.priorityChange(todo, direction);
  }

  $scope.toggleTodo = function (todo){
    return dataService.toggleTodo(todo);
  }

  $scope.resetTodoState = function(){
    $scope.todos.forEach(function(todo){
      todo.edited = false;
    })
  }
});