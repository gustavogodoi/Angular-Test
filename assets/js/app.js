angular.module('app', ['ui.filters'])

.controller('Calc', ['$scope', function($scope) {

  /** Init Vars */
  $scope.selectedOrigin = null;
  $scope.selectedDestination = null;
  $scope.valueDestination = [];
  $scope.valueWeight = [];
  $scope.resultOrigin = null;
  $scope.resultClass =  null;

  /** @type {Array} [description] */
  $scope.data = [
    {"origin":"Wexford","destination":"Wexford","weight":"0-5"},
    {"origin":"Wexford","destination":"Wexford","weight":"5-10"},
    {"origin":"Wexford","destination":"Wexford","weight":"10-30"},
    {"origin":"Wexford","destination":"Galway","weight":"0-5"},
    {"origin":"Wexford","destination":"Galway","weight":"5-10"},
    {"origin":"Galway","destination":"Wexford","weight":"0-5"},
  ];

 /** Watch for changes in Origin select */
  $scope.$watch('selectedOrigin', function(origin){
    $scope.valueDestination = [];
    $scope.valueWeight = [];
    angular.forEach($scope.data, function(value, key){
      if(value.origin == origin){
        $scope.valueDestination.push(value.destination);
      }
    });
    console.log($scope.valueDestination);
  });

 /** Watch for changes in Destination select */
  $scope.$watch('selectedDestination', function(destination){
    $scope.valueWeight = [];
    angular.forEach($scope.data, function(value, key){
      if(value.destination == destination){
        $scope.valueWeight.push(value.weight);
      }
    });
    console.log($scope.valueWeight);
  });

  $scope.getPrice = function(){

    /**
     * API Call
     */

    /** Fixed values for markup only */
    $scope.resultClass = 'active';
    $scope.resultOrigin = $scope.selectedOrigin;
    $scope.resultDestination = $scope.selectedDestination;
    $scope.resultWeight = $scope.selectedWeight;
    $scope.resultPrice = '25.00';
  }

}]);
