function UsersCtrl($http, $state, $scope, $rootScope, getToken, UserService){
    console.log('In UsersCtrl');
    $scope.user = {};
    $http.get('/users.json').success( function(response) {
        $scope.users = response.users;
        $scope.roles = response.roles;
        $scope.user.role = $scope.roles[0];
        console.log('users: ' + JSON.stringify($scope.users));
        console.log('roles: ' + JSON.stringify($scope.roles));
    });

    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });

    $scope.createUser = function(){
        UserService.addUser($scope.user)   
        .then(function(response){
            $state.go('dashboards.users.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create user : ' + error);
        });
    }    
    $scope.deleteUser = function(user_id){
        UserService.deleteUser(user_id)   
        .then(function(response){
            $state.go('dashboards.users.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete user : ' + error);
        });
    }    
}

angular
	.module('juki')
    .controller('UsersCtrl', UsersCtrl)	