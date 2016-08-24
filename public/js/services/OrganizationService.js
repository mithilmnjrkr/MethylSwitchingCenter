function OrganizationService($http){
	this.addOrganization = function(organization,user){
		return $http({
		    method : 'POST',
            url : '/organizations',
            data : {
                'organization' : organization,
                'user' : user
		    }   
		});
	}
	this.deleteOrganization = function(organization_id){
		return $http({
		    method : 'DELETE',
            url : '/organizations/' + organization_id	    
		});
	}
	this.getDetailOrganization = function(organization_id){
		return $http({
		    method : 'GET',
            url : '/organizations/get_detail/' + organization_id		    
		});
	}		
}

angular
	.module('juki')
    .service('OrganizationService', OrganizationService)