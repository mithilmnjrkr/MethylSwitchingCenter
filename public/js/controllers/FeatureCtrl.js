function FeaturesCtrl(getToken, FeatureService, $scope, $http, $rootScope, $state) {
    console.log('In FeaturesCtrl');
    $scope.feature = {};
    $scope.group = {};    
    $scope.feature_option = {};
    $scope.image = {};
    $scope.allData = {};    
    $scope.showNewGroupForm = false;
    
    getToken.getAuthToken().then(function(response){
        console.log("Res: " , response.data.token);
        $rootScope.token = response.data.token;
        console.log("Got a Token: " + $rootScope.token)
    },function(error){
        console.log("Error ", error);
    });
    
    $scope.createFeature = function(){
        $scope.feature.feature_group_id = $scope.group.selectedGroup.id;
        FeatureService.addFeature($scope.feature)   
        .then(function(response){
            $state.go('dashboards.features.new',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create feature : ' + error);
        });
    }
    $scope.getAllFeatures = function(){
        $http.get('/features.json').success( function(response) {
            $scope.allFeatures = response.features;
            $scope.allData.selectedFeature = $scope.allFeatures[0];
            console.log('Features : ' + JSON.stringify($scope.allFeatures));
        });     
    }    
    
    $scope.createGroup = function(){
        FeatureService.addGroup($scope.group)   
        .then(function(response){
        	 $state.go('dashboards.features.feature_group',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create group : ' + error);
        });    	
    }
    
    $scope.getAllGroup = function(){
        $http.get('/feature_groups.json').success( function(response) {
            $scope.group.feature_groups = response.feature_groups;
            $scope.group.selectedGroup = $scope.group.feature_groups[0];
            console.log('feature_groups : ' + JSON.stringify($scope.group.feature_groups));
        });    	
    }

    $scope.deleteFeature = function(feature_id){
        FeatureService.deleteFeature(feature_id)   
        .then(function(response){
            $state.go('dashboards.features.new',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete feature : ' + error);
        });
    }    
    
    $scope.deleteGroup = function(group_id){
    	FeatureService.deleteGroup(group_id)   
        .then(function(response){
            $state.go('dashboards.features.feature_group',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete group : ' + error);
        });
    }
    
    $scope.createFeatureOption = function(){
        $scope.feature_option.feature_id = $scope.allData.selectedFeature.id
        var file = $scope.image.avtar;

        FeatureService.addFeatureOption($scope.feature_option,file)   
        .then(function(response){
            $state.go('dashboards.features.feature_options',{}, {reload: true});
        }, function(error) {
            console.log('Failed to create feature option : ' + error);
        });
    }    

    $scope.getAllFeatureOptions = function(){
        $http.get('/feature_options.json').success( function(response) {
            $scope.allFeatureOptions = response.feature_options;
            console.log('Feature Options : ' + JSON.stringify($scope.allFeatureOptions));
        });     
    }     

    $scope.deleteFeatureOption = function(feature_option){
        FeatureService.deleteFeatureOption(feature_option)   
        .then(function(response){
            $state.go('dashboards.features.feature_options',{}, {reload: true});
        }, function(error) {
            console.log('Failed to delete feature_option : ' + error);
        });
    }    
    
};

angular
	.module('juki')
    .controller('FeaturesCtrl', FeaturesCtrl)	
