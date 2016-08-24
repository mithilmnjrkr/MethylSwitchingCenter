function LocationService($http){
	this.addLocation = function(location){
		return $http({
		    method : 'POST',
            url : '/locations',
            data : {
                'location' : location
		    }		    
		});
	}	
	this.deleteLocation = function(location_id){
		return $http({
		    method : 'DELETE',
            url : '/locations/' + location_id		    
		});
	}	
}

angular
	.module('juki')
	.service('LocationService', LocationService)