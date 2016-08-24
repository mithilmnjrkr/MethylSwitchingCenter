function LocationCtrl($http, $state, $scope, $rootScope, getToken, LocationService){
    console.log('In LocationCtrl');
    $scope.location = {};
    $http.get('/locations.json').success( function(response) {
        $scope.locations = response.locations;
        console.log('locations: ' + JSON.stringify($scope.locations));
    });

    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });

    $scope.createLocation = function(){
        LocationService.addLocation($scope.location)   
        .then(function(response){
            $state.go('dashboards.locations.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create location : ' + error);
        });
    }    
    $scope.deleteLocation = function(location_id){
        LocationService.deleteLocation(location_id)   
        .then(function(response){
            $state.go('dashboards.locations.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete location : ' + error);
        });
    }    
}

angular
	.module('juki')
    .controller('LocationCtrl', LocationCtrl)	