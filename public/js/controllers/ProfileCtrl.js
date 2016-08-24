function ProfileCtrl(getToken, ProfileService, $state, $scope, $rootScope, $http, $stateParams){
	console.log("profile controler")
    $scope.profile = {};
    $scope.profile.customer_id = $stateParams.id;
    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });
    

    $scope.createProfile = function(){
        console.log('Post : ' + JSON.stringify($scope.profile))
        ProfileService.createProfile($scope.profile,$scope.profile_version)   
        .then(function(response){
            $state.go('dashboards.customer.show',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create profile : ' + error);
        });
    }	
    $scope.updateProfile = function(){
        console.log('Post : ' + JSON.stringify($scope.profile))
        ProfileService.updateProfile($scope.profile,$scope.profile_version)   
        .then(function(response){
            $state.go('dashboards.customer.show',{}, {reload: true});
        }, function(error) {
            console.log('Failed to update profile : ' + error);
        });
    }
    $scope.deleteProfile = function(profile_id){
        console.log('in deleteProfile')
        ProfileService.deleteProfile(profile_id)   
        .then(function(response){
            $state.go('dashboards.customer.show',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete profile : ' + error);
        });
    }  
    $scope.showDetailProfile = function(profile){
        console.log(JSON.stringify(profile));
        $state.go('dashboards.customer.show',{'profile' : profile.id});        
    }
    $scope.editDetailProfile = function(profile){
        console.log(JSON.stringify(profile));
        $state.go('dashboards.customer.edit_profile',{'profile' : profile.id});        
    }      
    $scope.getDetailedProfile = function(){
        console.log($stateParams.profileId);
        profileId = $stateParams.profileId;
        if(profileId){
            ProfileService.getDetailProfile(profileId)
            .then(function(response){
                console.log('detailed_profile : '+ JSON.stringify(response.data.detailed_profile));
                console.log('profile : '+ JSON.stringify(response.data.profile));
                $scope.profile = response.data.profile;
                $scope.profile_version = response.data.detailed_profile[0];
                $scope.update_profile = true;
            }, function(error) {
                console.log('Failed to get Profile : ' , error);
            });
        }
    } 
    $scope.getDetailedProfileHistory = function(){
        console.log('in');
        ProfileService.getDetailedProfileHistory($stateParams.profile)
        .then(function(response){
            console.log('detailed_profile_history : ',response);
            $scope.profile = response.data.profile;
            $scope.detailed_profiles = response.data.detailed_profiles;
            console.log('detailed_profile_history:' + JSON.stringify($scope.detailed_profiles));
        }, function(error) {
            console.log('Failed to get Profile : ' , error);
        });        
    }

    $scope.get_list_detailed_profiles = function(){
        console.log("get_list_detailed_profiles")
        $scope.list_profiles = 1;
        customerID = $stateParams.id;
        if(customerID){
            
            ProfileService.get_list_detailed_profiles(customerID)
            .then(function(response){
                $scope.list_profiles = response.data;
               console.log("Found customer: " ,  $scope.list_profiles)
            }, function(error) {
                console.log('Failed to get Profile : ' , error);
            });
        }
    }         
}

angular
	.module('juki')
    .controller('ProfileCtrl', ProfileCtrl)