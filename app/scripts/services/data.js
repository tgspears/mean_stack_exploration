'use strict';

var angular = require('angular');

angular.module('todoListApp')
.service('dataService', function($http, $q) {
  this.getTodos = function(cb) {
    $http.get('/api/todos').then(cb);
  };
  
  this.deleteTodo = function(todo) {
    if (!todo._id) {
        return $q.resolve();
    }
    return $http.delete('/api/todos/' + todo._id).then(function () {
    });
  };

  this.priorityChange = function(todo, direction) {
    var request;
    if(!todo._id){
      console.log('no id');
      return $q.resolve();
    } else {
      if(direction === 'up'){
        todo.priority = todo.priority + 1;
      } else if(direction === 'down') {
        todo.priority = todo.priority - 1;
      } else {console.log('failure')}
      request = $http.put('/api/todos/' + todo._id, todo).then(function(result){
        todo = result.data.todo;
        return todo;
      });
    };
  }

  this.toggleTodo = function(todo){
    var request;
    if(!todo._id){
      console.log('no id');
      return $q.resolve();
    } else {
      request = $http.put('/api/todos/' + todo._id, todo).then(function(result){
        todo = result.data.todo;
        return todo;
      });
    };
  }
  
  this.saveTodos = function(todos) {
  	var queue = [];
  	todos.forEach(function(todo){
  		var request;
  		if(!todo._id) {
  			request = $http.post('/api/todos', todo);
  		} else {
  			request = $http.put('/api/todos/' + todo._id, todo).then(function(result){
  				todo = result.data.todo;
  				return todo;
  			});
  		};
  		queue.push(request);
  	})
  	return $q.all(queue);
  };
  
});
