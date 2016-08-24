
function MainCtrl(getToken, $scope, $http, RoleProviderService, $rootScope, AppContextFactory) {
    $scope.current_year = new Date().getFullYear();
	
    $scope.getToken = function(){
		getToken.getAuthToken().then(function(response){
			console.log("Res: " , response);
		},function(error){
			console.log("Error ", error);
		}); 
	}    

    //Manage Role
    RoleProviderService.getUserRole().then(function(response){
    	
    	AppContextFactory.setRoleName(response.data.role);
    	console.log("I am getting this from Factory: " + AppContextFactory.getRoleName())
    	
        $scope.role =AppContextFactory.getRoleName();
        if($scope.role === 'admin')
            $scope.admin = $scope.role;
        else if($scope.role === 'orgAdmin')
            $scope.orgAdmin = $scope.role;
        else
            $scope.user =$scope.role;
        console.log('Current User Role : ' + $scope.role);
    }, function(error){
        console.log("unable to fetch role");
    });
    
    $scope.logMeOut = function(){
        return $http({
            method : 'GET',
            url : "/user/sign_me_out"
        }).then(function(response){
            console.log("Logged out");
            window.location = '/';
        }, function(error){
            console.log("Not logged out: " + error);
        }); 
    } 
};


function translateCtrl($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.language = langKey;
    };
}

function appCtrl() {
    console.log('appCtrl');
}
function appShowCtrl() {
    console.log('appShowCtrl');
}
/**
 *
 * Pass all functions into module
 */
angular
    .module('juki')
    .controller('MainCtrl', MainCtrl)
    .controller('translateCtrl', translateCtrl)
    .controller('appCtrl', appCtrl)    
    .controller('appShowCtrl', appShowCtrl)


