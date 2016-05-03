webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp', []);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	angular.module('todoListApp')
	.directive('todo', function(){
	  return {
	    templateUrl: 'templates/todo.html',
	    replace: true,
	    controller: 'todoCtrl'
	  }
	});

/***/ }
]);