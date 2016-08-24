function OrganizationsCtrl(getToken, OrganizationService, $scope, $http, $state, $rootScope) {
    console.log('In OrganizationsCtrl');

    $scope.getAllOrganization = function(){
    	$http.get('/organizations.json').success( function(response) {
    		$scope.organizations = response;
    		console.log('organizations: ' + JSON.stringify(response));
    	}); 
    }

    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    }); 

    $scope.organization = {};
    $scope.user = {};
    console.log("Checking Token: " + $rootScope.token)
    $scope.createOrganization = function(){
        OrganizationService.addOrganization($scope.organization,$scope.user)   
        .then(function(response){
            $state.go('dashboards.organization.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create Org : ' , error);
        });
    }
    $scope.deleteOrganization = function(organization_id){
    	console.log("Pog id: " + organization_id)
        OrganizationService.deleteOrganization(organization_id)   
        .then(function(response){
            $state.go('dashboards.organization.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete Org : ' + error);
        });
    }   

    $scope.getDetailOrganization = function(organization_id){
        $state.go('dashboards.organization.show',{'id' : organization_id});
    }    
};

function OrganizationShowCtrl(getToken, OrganizationService, UserService, LocationService, $scope, $http, $state, $stateParams) {

    $scope.organization = {};
    OrganizationService.getDetailOrganization($stateParams.id)   
    .then(function(response){
        $scope.organization.detail = response.data.organization;
        $scope.organization.users = response.data.users;
        $scope.organization.locations = response.data.locations;
        $scope.organization.orders = response.data.orders;
    }, function(error) {
        console.log('Failed to get Org : ' + error);
    });

    $scope.deleteUser = function(user_id){
        UserService.deleteUser(user_id)   
        .then(function(response){
            $state.go('dashboards.organization.show',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete user : ' + error);
        });
    }    
    $scope.deleteLocation = function(location_id){
        LocationService.deleteLocation(location_id)   
        .then(function(response){
            $state.go('dashboards.organization.show',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete location : ' + error);
        });
    }     
};

angular
	.module('juki')
    .controller('OrganizationsCtrl', OrganizationsCtrl)
    .controller('OrganizationShowCtrl', OrganizationShowCtrl)
