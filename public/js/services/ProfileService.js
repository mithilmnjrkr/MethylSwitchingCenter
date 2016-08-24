function ProfileService($http){
	this.createProfile = function(profile,profile_version){
		return $http({
		    method : 'POST',
            url : '/detailed_profiles',
            data : {
                'profile' : profile,
                'profile_version' : profile_version
		    }		    
		});
	}	
	this.updateProfile = function(profile,profile_version){
		return $http({
		    method : 'POST',
            url : '/detailed_profiles/update/' + profile.id,
            data : {
                'profile' : profile,
                'profile_version' : profile_version
		    }		    
		});
	}	
	this.deleteProfile = function(profile_id){
		return $http({
		    method : 'DELETE',
            url : '/profiles/' + profile_id		    
		});
	}		
	this.getDetailProfile = function(profile_id){
		return $http({
		    method : 'GET',
            url : '/profiles/get_detail/' + profile_id		    
		});
	}
	this.getDetailedProfileHistory = function(profile_id){
		return $http({
		    method : 'GET',
            url : '/profiles/get_history/' + profile_id		    
		});
	}

	this.get_list_detailed_profiles = function(customer_id){
		return $http({
		    method : 'GET',
            url : '/detailed_profiles/list_detailed_profiles/' + customer_id		    
		});
	}
}

angular
	.module('juki')
    .service('ProfileService', ProfileService)