function FeatureService($http){
	this.addFeature = function(feature){
		return $http({
		    method : 'POST',
            url : '/features',
            data : {
                'feature' : feature
		    }		    
		});
	}
	
	this.addFeatureOption = function(feature_option,file){
       var fd = new FormData();
       fd.append('image', file);
       fd.append('code', feature_option.code);
       fd.append('name', feature_option.name);
       fd.append('short_label', feature_option.short_label);
       fd.append('description', feature_option.description);
       fd.append('feature_id', feature_option.feature_id);

		console.log('POST feature_options : ' + JSON.stringify(feature_option));
		return $http({
		    method : 'POST',
		    transformRequest: angular.identity,
            url : '/feature_options',
            data : fd,
            headers: {'Content-Type': undefined}		    
		});
	}
	
	this.addGroup = function(group){
		return $http({
			method : 'POST',
			url : '/feature_groups',
			data : {
				'feature_group' : group
			}
		})
	}

	this.deleteFeature = function(feature_id){
		return $http({
		    method : 'DELETE',
            url : '/features/' + feature_id		    
		});
	}	

	this.deleteGroup = function(group_id){
		return $http({
		    method : 'DELETE',
            url : '/feature_groups/' + group_id		    
		});
	}

	this.deleteFeatureOption = function(feature_option_id){
		return $http({
		    method : 'DELETE',
            url : '/feature_options/' + feature_option_id		    
		});
	}

	this.getAllGroupsDetail = function(){
		return $http({
			method: 'GET',
			url: '/getAllGroupsDetail'
		});
	}
}

angular
	.module('juki')
	.service('FeatureService', FeatureService)