function CustomersCtrl($http, $state, $scope, $rootScope, getToken, CustomerService){
    console.log('In CustomersCtrl');
    $scope.customer = {};
    $http.get('/customers.json').success( function(response) {
        $scope.customers = response.customers;
        console.log('customers: ' + JSON.stringify($scope.customers));
    });

    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });

    $scope.createCustomer = function(){
        CustomerService.addCustomer($scope.customer)   
        .then(function(response){
            $state.go('dashboards.customers.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create customer : ' + error);
        });
    }    
    $scope.deleteCustomer = function(customer_id){
        CustomerService.deleteCustomer(customer_id)   
        .then(function(response){
            $state.go('dashboards.customers.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete customer : ' + error);
        });
    }  
    $scope.getDetailCustomer = function(customer_id){
        $state.go('dashboards.customer.show',{'id' : customer_id});
    }
}

function CustomerShowCtrl(getToken, CustomerService, UserService, ProfileService, $scope, $http, $state, $stateParams) {
    console.log('In CustomerShowCtrl');

    $scope.tabs = [
        { title: "Orders", route: "orders", active: false },
        { title: "Profiles", route: "profiles", active: true },
    ];

    $scope.customer = {};
    CustomerService.getDetailCustomer($stateParams.id)   
    .then(function(response){
        console.log('response : ',response)
        $scope.customer.detail = response.data.customer;
        $scope.customer.profiles = response.data.customer.profiles;
    }, function(error) {
        console.log('Failed to get Customer : ' , error);
    });

    $scope.deleteUser = function(user_id){
        UserService.deleteUser(user_id)   
        .then(function(response){
            $state.go('dashboards.organizations.all',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete user : ' + error);
        });
    }    
    $scope.deleteProfile = function(profile_id){
        console.log('in deleteProfile');
        ProfileService.deleteProfile(profile_id)   
        .then(function(response){
            $state.go('dashboards.customer.show',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete profile : ' + error);
        });
    } 


};

angular
	.module('juki')
    .controller('CustomersCtrl', CustomersCtrl)
    .controller('CustomerShowCtrl', CustomerShowCtrl)  
    